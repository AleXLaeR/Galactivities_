using AutoMapper;
using Domain.Entities;
using Domain.Entities.Activities;
using FluentResults;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Edit
{
    public class Command : IRequest<Result<Unit>>
    {
        public Activity Activity { get; set; } 
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _mapper = mapper;  
            _context = context;
        }
        
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Activity.Id);
            
            if (activity is null)
                return Result.Fail(new Error("Cannot find an activity to delete"));

            _mapper.Map(request.Activity, activity);
            
            var resultIsSuccess = await _context.SaveChangesAsync(cancellationToken) > 0;
            return (resultIsSuccess) ? Result.Ok(Unit.Value) : Result.Fail(new Error("Failed to create an activity"));
        }
    }
}