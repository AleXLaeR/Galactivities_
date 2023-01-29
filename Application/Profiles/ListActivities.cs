using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using Domain.Enums;
using Domain.Enums.Filtering;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class ListActivities
{
    public class Query : IRequest<Result<List<UserActivityDto>>>
    {
        public string Username { get; set; }
        
        public ProfileActivityFilter Filter { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context,  IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = _context.ActivityAttendees
                .Where(aa => aa.User.UserName == request.Username)
                .OrderBy(aa => aa.Activity.Date)
                .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                .AsQueryable();

            query = request.Filter switch
            {
                ProfileActivityFilter.Hosting => query.Where(aa => aa.HostUsername == request.Username),
                ProfileActivityFilter.Future => query.Where(aa => aa.Date >= DateTime.UtcNow),
                ProfileActivityFilter.Past => query.Where(aa => aa.Date < DateTime.UtcNow),
                var _ => query,
            };
            
            var activities = await query.ToListAsync(cancellationToken);
            return Result.Ok(activities);
        }
    }
}