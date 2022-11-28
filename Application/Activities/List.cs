using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using Domain.Entities;
using Domain.Entities.Params;
using FluentResults;
using MediatR;
using Persistence;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<Result<PagedList<ActivityDto>>>
    {
        public SortingPagedParams SortingPagedParams { get; set; }
    }
    
    public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activityDbSet = _context.Activities;
            
            var activities = request.SortingPagedParams.Filter switch
            {
                ActivitySortingFilter.Popularity => activityDbSet.OrderBy(a => a.Attendees.Count),
                ActivitySortingFilter.PopularityDescending => activityDbSet.OrderByDescending(a => a.Attendees.Count),
                ActivitySortingFilter.DateDescending => activityDbSet.OrderByDescending(a => a.Date),
                //"relevancy" => activityDbSet.OrderBy(a => a.CommentsAmount),
                
                var _ => activityDbSet.OrderBy(a => a.Date)
            };
                
            var asQueryable = activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .AsQueryable();
            
            return Result.Ok(await PagedList<ActivityDto>
                .CreateAsync(asQueryable, request.SortingPagedParams.PageNumber,
                    request.SortingPagedParams.PageSize));
        }
    }
}