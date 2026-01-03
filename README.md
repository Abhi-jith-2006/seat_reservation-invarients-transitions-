
SEAT RESERVATION BACKEND


This is a backend project where I built a seat reservation system similar to what you see in movie ticket booking or event platforms.
The focus is not UI or features but making sure the rules of the system are always correct even when multiple users hit it at the same time.

THE PROBLEM I AM SOLVING

When users try to reserve seats
the same seat should never be booked twice
unfinished reservations should not block seats forever
users should not be able to do invalid actions
This project is built to handle those cases cleanly


RESERVATION STATES

Each reservation can be in one of these states
RESERVED - seat is temporarily held
CONFIRMED - booking is final
CANCELLED - user cancelled the reservation
EXPIRED - system released the seat automatically

Only these transitions are allowed

RESERVED -> CONFIRMED  
RESERVED -> CANCELLED  
RESERVED -> EXPIRED  

Once a reservation leaves RESERVED it cannot change again

CORE RULE INVARIANT


A seat can have only one active reservation at a time
RESERVED or CONFIRMED

This rule is enforced at the database level so it stays correct even under concurrent requests


PROJECT STRUCTURE

The code is split by responsibility

http - request and response handling  
domain - business rules and state validation  
jobs - background expiry job  
errors - custom domain error classes  

All business logic lives in the domain layer not in routes


EXPIRY HANDLING


Reservations are time limited
A background cron job runs every minute and expires any reservation whose expiry time has passed
There is no HTTP endpoint to trigger expiry
Expiry is a system responsibility not a user action


ERROR HANDLING


Instead of using error strings the project uses custom domain error classes:
invalid actions return 400
seat conflicts return 409
missing data returns 404
This keeps domain logic independent of HTTP


API ENDPOINTS


POST /reservations - seatId - reserve
POST /reservations - reservationId - confirm
POST /reservations - reservationId - cancel
There is no endpoint for expiry


WHY THIS PROJECT


This is not a CRUD project
It focuses on:
  state machines
  invariants
  concurrency safety
  background processing
  


