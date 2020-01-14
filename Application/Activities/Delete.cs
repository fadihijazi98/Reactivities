using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
namespace Application.Activities
{
    public class Delete
    {

        public class Command : IRequest
        {
            public Guid Id;
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
                var actitivty = await _context.Activities.FindAsync(request.Id);
                if (actitivty == null)
                    throw new Exception("Could not have activity");
                else
                {
                    _context.Remove(actitivty);
                    var success = await _context.SaveChangesAsync() > 0;
                    // Unit : empty object, and we use Unit.Value just to set the response 202.
                    if (success) return Unit.Value; // this mean there's response then Ok = 202 
                    else
                        throw new Exception("Problem In Save Changes");
                }
            }
        }

    }
}