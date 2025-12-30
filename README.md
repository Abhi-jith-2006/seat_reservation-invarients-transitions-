## Core Invariant
At most one active reservation (RESERVED or CONFIRMED) can exist per seat.

## States
RESERVED → CONFIRMED
RESERVED → CANCELLED
RESERVED → EXPIRED

CONFIRMED, CANCELLED, EXPIRED are terminal.

## Rules
- Seats have no state
- Reservations are never deleted
- All state transitions are explicit
- DB enforces the invariant
