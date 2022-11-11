using Domain;
using FluentResults;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Create
{
    public class Command : IRequest<Result<Unit>>
    {
        public Activity Activity { get; set; } 
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }
        
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            _context.Activities.Add(request.Activity);
            
            var resultIsSuccess = await _context.SaveChangesAsync(cancellationToken) > 0;
            return (resultIsSuccess) ? Result.Ok(Unit.Value) : Result.Fail(new Error("Failed to create an activity"));
        }
    }
}