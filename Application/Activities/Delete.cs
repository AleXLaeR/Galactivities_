using MediatR;
using Persistence;

namespace Application.Activities;

public class Delete
{
    public class Command : IRequest
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }
        
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id);
            _context.Activities.Remove(activity!);

            await _context.SaveChangesAsync(cancellationToken);
            
            return Unit.Value;
        }
    }
}