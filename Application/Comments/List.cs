using System.ComponentModel.DataAnnotations;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using FluentResults;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments;

public class List
{
    public class Query : IRequest<Result<List<CommentDto>>>
    {
        public Guid ActivityId { get; set; }
        
        [Required]
        public string Body { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<List<CommentDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<Result<List<CommentDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var comments = await _context.Comments
                .Where(c => c.Activity.Id == request.ActivityId)
                .OrderBy(c => c.CreatedAt)
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return Result.Ok(comments);
        }
    }
}