/**
 * Generic Validation Rules Engine
 * Reusable validation framework for all product types
 */

export interface ValidationRule<T> {
  field: keyof T | string
  validator: (value: any, config: T) => boolean
  message: string
  suggestion?: string
  severity: 'error' | 'warning'
}

export interface ValidationError {
  field: string
  message: string
  suggestion?: string
  severity: 'error' | 'warning'
}

export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationError[]
}

/**
 * Generic rules engine
 */
export class RulesEngine<T> {
  private rules: ValidationRule<T>[] = []

  /**
   * Add a validation rule
   */
  addRule(rule: ValidationRule<T>): this {
    this.rules.push(rule)
    return this
  }

  /**
   * Add multiple rules
   */
  addRules(rules: ValidationRule<T>[]): this {
    this.rules.push(...rules)
    return this
  }

  /**
   * Validate configuration against all rules
   */
  validate(config: T): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationError[] = []

    for (const rule of this.rules) {
      const fieldValue = config[rule.field as keyof T]
      const isValid = rule.validator(fieldValue, config)

      if (!isValid) {
        const error: ValidationError = {
          field: String(rule.field),
          message: rule.message,
          suggestion: rule.suggestion,
          severity: rule.severity,
        }

        if (rule.severity === 'error') {
          errors.push(error)
        } else {
          warnings.push(error)
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    }
  }

  /**
   * Clear all rules
   */
  clearRules(): this {
    this.rules = []
    return this
  }
}

/**
 * Common validation helpers
 */
export const Validators = {
  /**
   * Validate value is within range
   */
  inRange: (min: number, max: number) => (value: number) => {
    return value >= min && value <= max
  },

  /**
   * Validate value is greater than
   */
  greaterThan: (min: number) => (value: number) => {
    return value > min
  },

  /**
   * Validate value is less than
   */
  lessThan: (max: number) => (value: number) => {
    return value < max
  },

  /**
   * Validate value is one of allowed values
   */
  oneOf: <T>(allowedValues: T[]) => (value: T) => {
    return allowedValues.includes(value)
  },

  /**
   * Validate value is not null/undefined
   */
  required: (value: any) => {
    return value !== null && value !== undefined && value !== ''
  },

  /**
   * Validate value matches pattern
   */
  pattern: (regex: RegExp) => (value: string) => {
    return regex.test(value)
  },

  /**
   * Custom validator
   */
  custom: <T>(fn: (value: any, config: T) => boolean) => fn,
}

/**
 * Rule builder for fluent API
 */
export class RuleBuilder<T> {
  private field: keyof T | string
  private validatorFn?: (value: any, config: T) => boolean
  private errorMessage?: string
  private suggestionText?: string
  private severityLevel: 'error' | 'warning' = 'error'

  constructor(field: keyof T | string) {
    this.field = field
  }

  /**
   * Set validator function
   */
  validator(fn: (value: any, config: T) => boolean): this {
    this.validatorFn = fn
    return this
  }

  /**
   * Set error message
   */
  message(msg: string): this {
    this.errorMessage = msg
    return this
  }

  /**
   * Set suggestion
   */
  suggestion(msg: string): this {
    this.suggestionText = msg
    return this
  }

  /**
   * Set severity
   */
  severity(level: 'error' | 'warning'): this {
    this.severityLevel = level
    return this
  }

  /**
   * Build the rule
   */
  build(): ValidationRule<T> {
    if (!this.validatorFn || !this.errorMessage) {
      throw new Error('Validator and message are required')
    }

    return {
      field: this.field,
      validator: this.validatorFn,
      message: this.errorMessage,
      suggestion: this.suggestionText,
      severity: this.severityLevel,
    }
  }
}

/**
 * Create a rule builder
 */
export function rule<T>(field: keyof T | string): RuleBuilder<T> {
  return new RuleBuilder<T>(field)
}
