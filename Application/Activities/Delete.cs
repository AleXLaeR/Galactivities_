using FluentResults;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Delete
{
    public class Command : IRequest<Result<Unit>>
    {
        public Guid Id { get; set; }
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
            var activity = await _context.Activities.FindAsync(request.Id);

            if (activity is null)
                return Result.Fail(new Error("Cannot find an activity to delete"));

            _context.Activities.Remove(activity);

            var resultIsSuccess = await _context.SaveChangesAsync(cancellationToken) > 0;
            return (resultIsSuccess) ? Result.Ok(Unit.Value) : Result.Fail(new Error("Failed to delete an activity"));
        }
    }
}