openapi: 3.1.0
info:
  # Do not change the title, if the title changes, the import paths will be broken
  title: Api
  version: 0.1.0
  description: API specification
servers:
  - url: /api
    description: Base API path
tags:
  - name: health
    description: Health operations
  - name: waitlist
    description: Email waitlist signup
paths:
  /healthz:
    get:
      operationId: healthCheck
      tags: [health]
      summary: Health check
      description: Returns server health status
      responses:
        "200":
          description: Healthy
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/HealthStatus"

  /waitlist:
    post:
      operationId: joinWaitlist
      tags: [waitlist]
      summary: Join the early access waitlist
      description: Saves a user's email to the waitlist and returns a confirmation
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WaitlistSignupRequest"
      responses:
        "200":
          description: Successfully joined the waitlist
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WaitlistSignupResponse"
        "409":
          description: Email already on the waitlist
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WaitlistSignupResponse"
        "422":
          description: Invalid email
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ErrorResponse"

components:
  schemas:
    HealthStatus:
      type: object
      properties:
        status:
          type: string
      required:
        - status

    WaitlistSignupRequest:
      type: object
      properties:
        email:
          type: string
          format: email
      required:
        - email

    WaitlistSignupResponse:
      type: object
      properties:
        success:
          type: boolean
        message:
          type: string
        alreadyRegistered:
          type: boolean
      required:
        - success
        - message
        - alreadyRegistered

    ErrorResponse:
      type: object
      properties:
        error:
          type: string
      required:
        - error
