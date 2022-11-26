using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities.Profiles;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles;

public class Details
{
    public class Query : IRequest<Result<UserProfile>>
    {
        public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<UserProfile>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .ProjectTo<UserProfile>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);
            
            return Result.Ok(user)!;
        }
    }
}