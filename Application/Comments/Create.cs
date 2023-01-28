using System.ComponentModel.DataAnnotations;
using AutoMapper;
using Domain.DTOs;
using Domain.Entities.Comments;
using FluentResults;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments;

public class Create
{
    public class Command : IRequest<Result<CommentDto>>
    {
        public Guid ActivityId { get; set; }
        
        [Required]
        public string Body { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<CommentDto>>
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
        
        public async Task<Result<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.ActivityId);

            if (activity is null)
                return Result.Fail(new Error("Cannot find an activity with that id"));

            var user = await _context.Users
                .Include(u => u.Images)
                .SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetUsername(), cancellationToken);
            
            if (user is null)
                return Result.Fail(new Error("User is currently not logged in"));

            var comment = new Comment
            {
                Author = user,
                Activity = activity,
                Body = request.Body,
            };
            var mappedComment = _mapper.Map<CommentDto>(comment);

            _context.Comments.Add(comment);
            
            var resultIsSuccess = await _context.SaveChangesAsync(cancellationToken) > 0;
            return (resultIsSuccess) ? Result.Ok(mappedComment) : Result.Fail(new Error("Failed to create a comment"));
        }
    }
}