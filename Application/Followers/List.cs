using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities.Profiles;
using Domain.Enums;
using FluentResults;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers;

public class List
{
    public class Query : IRequest<Result<List<UserProfile>>>
    {
        public FollowType FollowType { get; set; }

        public string Username { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<UserProfile>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IMapper mapper,
            IUserAccessor userAccessor)
        {
            _context = context;
            _mapper = mapper;
            _userAccessor = userAccessor;
        }
        
        public async Task<Result<List<UserProfile>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var selectedFollows = request.FollowType switch
            {
                FollowType.Followers => _context.UserFollowings
                    .Where(uu => uu.Target.UserName == request.Username)
                    .Select(uu => uu.Observer),
                
                FollowType.Followings => _context.UserFollowings
                    .Where(uu => uu.Observer.UserName == request.Username)
                    .Select(uu => uu.Target),
                
                var _ => throw new MissingMemberException()
            };

            var projectedProfiles = await selectedFollows
                .ProjectTo<UserProfile>(_mapper.ConfigurationProvider,
                    new { currentUsername = _userAccessor.GetUsername() })
                .ToListAsync(cancellationToken);

            return Result.Ok(projectedProfiles);
        }
    }
}