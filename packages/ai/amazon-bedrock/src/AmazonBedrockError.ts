/**
 * Amazon Bedrock error metadata augmentation.
 *
 * Provides Amazon Bedrock-specific metadata fields for AI error types through
 * module augmentation, enabling typed access to Bedrock error details.
 *
 * @since 1.0.0
 */

/**
 * Amazon Bedrock-specific error metadata fields.
 *
 * @since 1.0.0
 * @category models
 */
export type AmazonBedrockErrorMetadata = {
  /**
   * The Amazon Bedrock error type returned by the API.
   */
  readonly errorType: string | null
  /**
   * The unique request ID for debugging with AWS support.
   */
  readonly requestId: string | null
}

declare module "effect/unstable/ai/AiError" {
  export interface RateLimitErrorMetadata {
    readonly bedrock?: AmazonBedrockErrorMetadata | null
  }

  export interface QuotaExhaustedErrorMetadata {
    readonly bedrock?: AmazonBedrockErrorMetadata | null
  }

  export interface AuthenticationErrorMetadata {
    readonly bedrock?: AmazonBedrockErrorMetadata | null
  }

  export interface ContentPolicyErrorMetadata {
    readonly bedrock?: AmazonBedrockErrorMetadata | null
  }

  export interface InvalidRequestErrorMetadata {
    readonly bedrock?: AmazonBedrockErrorMetadata | null
  }

  export interface InternalProviderErrorMetadata {
    readonly bedrock?: AmazonBedrockErrorMetadata | null
  }

  export interface InvalidOutputErrorMetadata {
    readonly bedrock?: AmazonBedrockErrorMetadata | null
  }

  export interface StructuredOutputErrorMetadata {
    readonly bedrock?: AmazonBedrockErrorMetadata | null
  }

  export interface UnsupportedSchemaErrorMetadata {
    readonly bedrock?: AmazonBedrockErrorMetadata | null
  }

  export interface UnknownErrorMetadata {
    readonly bedrock?: AmazonBedrockErrorMetadata | null
  }
}
