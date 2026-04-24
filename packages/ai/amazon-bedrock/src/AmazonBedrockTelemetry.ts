/**
 * Amazon Bedrock telemetry attributes for OpenTelemetry integration.
 *
 * Provides Amazon Bedrock-specific GenAI telemetry attributes following
 * OpenTelemetry semantic conventions, extending the base GenAI attributes with
 * Bedrock-specific request and response metadata.
 *
 * @since 1.0.0
 */
import { dual } from "effect/Function"
import * as String from "effect/String"
import type { Span } from "effect/Tracer"
import type { Simplify } from "effect/Types"
import * as Telemetry from "effect/unstable/ai/Telemetry"

/**
 * The attributes used to describe telemetry in the context of Generative
 * Artificial Intelligence (GenAI) Models requests and responses.
 *
 * {@see https://opentelemetry.io/docs/specs/semconv/attributes-registry/gen-ai/}
 *
 * @since 1.0.0
 * @category models
 */
export type AmazonBedrockTelemetryAttributes = Simplify<
  & Telemetry.GenAITelemetryAttributes
  & Telemetry.AttributesWithPrefix<RequestAttributes, "gen_ai.aws.bedrock.request">
  & Telemetry.AttributesWithPrefix<ResponseAttributes, "gen_ai.aws.bedrock.response">
>

/**
 * All telemetry attributes which are part of the GenAI specification,
 * including the Amazon Bedrock-specific attributes.
 *
 * @since 1.0.0
 * @category models
 */
export type AllAttributes = Telemetry.AllAttributes & RequestAttributes & ResponseAttributes

/**
 * Telemetry attributes which are part of the GenAI specification and are
 * namespaced by `gen_ai.aws.bedrock.request`.
 *
 * @since 1.0.0
 * @category models
 */
export interface RequestAttributes {
  /**
   * The AWS region used for the request.
   */
  readonly guardrailId?: string | null | undefined
}

/**
 * Telemetry attributes which are part of the GenAI specification and are
 * namespaced by `gen_ai.aws.bedrock.response`.
 *
 * @since 1.0.0
 * @category models
 */
export interface ResponseAttributes {
  /**
   * The stop reason from the response.
   */
  readonly stopReason?: string | null | undefined
  /**
   * Number of cache write input tokens.
   */
  readonly cacheWriteInputTokens?: number | null | undefined
}

/**
 * @since 1.0.0
 * @category models
 */
export type AmazonBedrockTelemetryAttributeOptions = Telemetry.GenAITelemetryAttributeOptions & {
  bedrock?: {
    request?: RequestAttributes | undefined
    response?: ResponseAttributes | undefined
  } | undefined
}

const addBedrockRequestAttributes = Telemetry.addSpanAttributes("gen_ai.aws.bedrock.request", String.camelToSnake)<
  RequestAttributes
>
const addBedrockResponseAttributes = Telemetry.addSpanAttributes("gen_ai.aws.bedrock.response", String.camelToSnake)<
  ResponseAttributes
>

/**
 * Applies the specified Amazon Bedrock GenAI telemetry attributes to the
 * provided `Span`.
 *
 * **NOTE**: This method will mutate the `Span` **in-place**.
 *
 * @since 1.0.0
 * @category utilities
 */
export const addGenAIAnnotations: {
  (options: AmazonBedrockTelemetryAttributeOptions): (span: Span) => void
  (span: Span, options: AmazonBedrockTelemetryAttributeOptions): void
} = dual(2, (span: Span, options: AmazonBedrockTelemetryAttributeOptions) => {
  Telemetry.addGenAIAnnotations(span, options)
  if (options.bedrock != null) {
    if (options.bedrock.request != null) {
      addBedrockRequestAttributes(span, options.bedrock.request)
    }
    if (options.bedrock.response != null) {
      addBedrockResponseAttributes(span, options.bedrock.response)
    }
  }
})
