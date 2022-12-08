using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using Domain.Entities;
using Domain.Enums.Filtering;
using FluentResults;
using Infrastructure.Interfaces;
using MediatR;
using Persistence;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<Result<PagedList<ActivityDto>>>
    {
        public FilterParams Params { get; set; }
    }
    
    public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }

        public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var asQueryable = _context.Activities
                .Where(a => a.Date >= request.Params.StartDate)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                    new { currentUsername = _userAccessor.GetUsername() })
                .AsQueryable();

            var sortedActivities = GetFilteredActivities(asQueryable, request.Params);
            var filteredSorted = GetSortedActivities(sortedActivities, request.Params.Filter);
            
            return Result.Ok(await PagedList<ActivityDto>
                .CreateAsync(filteredSorted, request.Params.PageNumber, request.Params.PageSize));
        }
        
        private IQueryable<ActivityDto> GetFilteredActivities(
            IQueryable<ActivityDto> activities, 
            FilterParams @params)
        {
            if (@params.IsGoing && !@params.IsHost)
            {
                activities = activities.Where(a =>
                    a.Attendees.Any(dto => dto.Username == _userAccessor.GetUsername()));
            }
            if (@params.IsHost && !@params.IsGoing)
            {
                activities = activities.Where(a => a.HostUsername == _userAccessor.GetUsername());
            }

            return activities;
        }

        private static IQueryable<ActivityDto> GetSortedActivities(
            IQueryable<ActivityDto> activities, 
            ActivitySortingFilter filter) => filter switch
        {
            ActivitySortingFilter.Popularity => activities.OrderBy(a => a.Attendees.Count),
            ActivitySortingFilter.PopularityDescending => activities.OrderByDescending(a => a.Attendees.Count),
            ActivitySortingFilter.DateDescending => activities.OrderByDescending(a => a.Date),
            //"relevancy" => activityDbSet.OrderBy(a => a.CommentsAmount),

            var _ => activities.OrderBy(a => a.Date)
        };
    }
}