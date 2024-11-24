export const PayrollIDL = {
    "version": "0.1.0",
    "name": "payroll_program",
    "instructions": [
      {
        "name": "create_payroll",
        "accounts": [
          {
            "name": "payroll",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "owner",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "period",
            "type": "u64"
          }
        ]
      },
      {
        "name": "fund_payroll",
        "accounts": [
          {
            "name": "payroll",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "owner",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
      // Add other instructions as needed...
    ],
    "accounts": [
      {
        "name": "payroll",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "owner",
              "type": "publicKey"
            },
            {
              "name": "period",
              "type": "u64"
            },
            {
              "name": "isInitialized",
              "type": "bool"
            },
            {
              "name": "isPaused",
              "type": "bool"
            },
            {
              "name": "employees",
              "type": {
                "vec": "publicKey"
              }
            },
            {
              "name": "salaries",
              "type": {
                "vec": {
                  "defined": "SalaryInfo"
                }
              }
            }
          ]
        }
      }
    ],
    "types": [
      {
        "name": "SalaryInfo",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "employee",
              "type": "publicKey"
            },
            {
              "name": "amount",
              "type": "u64"
            },
            {
              "name": "interval",
              "type": "u64"
            },
            {
              "name": "lastClaimed",
              "type": "u64"
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "EmployeeAlreadyExists",
        "msg": "Employee already exists in payroll"
      },
      {
        "code": 6001,
        "name": "EmployeeNotFound",
        "msg": "Employee not found in payroll"
      },
      {
        "code": 6002,
        "name": "PayrollPaused",
        "msg": "Payroll is paused"
      },
      {
        "code": 6003,
        "name": "InsufficientFunds",
        "msg": "Insufficient funds"
      },
      {
        "code": 6004,
        "name": "InvalidSalary",
        "msg": "Invalid salary amount"
      },
      {
        "code": 6005,
        "name": "PayrollNotInitialized",
        "msg": "Payroll not initialized"
      },
      {
        "code": 6006,
        "name": "NotEnoughTimeElapsed",
        "msg": "Not enough time elapsed since last claim"
      },
      {
        "code": 6007,
        "name": "Unauthorized",
        "msg": "Unauthorized operation"
      }
    ]
  };