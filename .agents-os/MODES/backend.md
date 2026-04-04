# Mode: Backend

## Goal

Implement backend features with architectural discipline and strong tests.

## Priorities

- domain correctness
- repository contracts
- use-cases
- auth/ownership rules
- low coupling
- test coverage

## Preferred Order

1. contracts
2. repository updates
3. use-cases
4. services/helpers
5. handlers/api
6. integration validation

## Rules

- thin handlers
- no business logic in routes
- explicit input/output shapes
- protect ownership and auth checks
- TDD first when possible
