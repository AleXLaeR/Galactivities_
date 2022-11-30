using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities.Profiles;
using FluentResults;
using Infrastructure.Interfaces;
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
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }
        
        public async Task<Result<UserProfile>> Handle(Query request, CancellationToken cancellationToken)
        {
            var user = await _context.Users
                .ProjectTo<UserProfile>(_mapper.ConfigurationProvider,
                    new { currentUsername = _userAccessor.GetUsername() })
                .FirstOrDefaultAsync(u => u.Username == request.Username, cancellationToken);
            
            return Result.Ok(user)!;
        }
    }
}