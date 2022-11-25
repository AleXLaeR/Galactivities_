using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities;

public class List
{
    public class Query : IRequest<Result<List<ActivityDto>>>
    {
        
    }
    
    public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
            
            return Result.Ok(activities);
        }
    }
}