class DomainError extends Error{
    constructor(message){
        super(message);
        this.name = this.constructor.name
    }
}

class NotFoundError extends DomainError {};
class InvalidTransitionError extends DomainError {};
class ConflictError extends DomainError {};

module.exports = {
    DomainError , NotFoundError , InvalidTransitionError , ConflictError
};