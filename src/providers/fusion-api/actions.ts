import type { ActionDefinition, JsonSchema } from "../../core/types.ts";
import type { FusionApiOperationDefinition } from "./generated.ts";

import { defineProviderAction } from "../../core/provider-definition.ts";
import { fusionApiOperations } from "./generated.ts";

const service = "fusion-api";

function optionalDescription(schema: JsonSchema): string | undefined {
  return typeof schema.description === "string" && schema.description.trim() ? schema.description : undefined;
}

function withDescription(schema: JsonSchema, fallback: string): JsonSchema {
  return {
    ...schema,
    description: optionalDescription(schema) ?? fallback,
  };
}

function buildFusionApiFollowUpActions(
  operation: FusionApiOperationDefinition,
  operationByName: Map<string, FusionApiOperationDefinition>,
): string[] | undefined {
  if (!operation.actionName.endsWith("_submit")) {
    return undefined;
  }

  const actionPrefix = operation.actionName.slice(0, -"_submit".length);
  const followUpActions: string[] = [];
  if (operationByName.has(`${actionPrefix}_result`)) {
    followUpActions.push(`${service}.${actionPrefix}_result`);
  }
  if (operationByName.has(`${actionPrefix}_state`)) {
    followUpActions.push(`${service}.${actionPrefix}_state`);
  }

  return followUpActions.length > 0 ? followUpActions : undefined;
}

function buildFusionApiAsyncLifecycle(
  operation: FusionApiOperationDefinition,
  operationByName: Map<string, FusionApiOperationDefinition>,
): ActionDefinition["asyncLifecycle"] | undefined {
  if (!operation.actionName.endsWith("_submit")) {
    return undefined;
  }

  const actionPrefix = operation.actionName.slice(0, -"_submit".length);
  if (!operationByName.has(`${actionPrefix}_result`)) {
    return undefined;
  }

  return {
    startActionId: `${service}.${operation.actionName}`,
    statusActionId: `${service}.${actionPrefix}_result`,
  };
}

function buildFusionApiAction(
  operation: FusionApiOperationDefinition,
  operationByName: Map<string, FusionApiOperationDefinition>,
): ActionDefinition {
  return defineProviderAction(service, {
    name: operation.actionName,
    description: operation.description,
    requiredScopes: [],
    inputSchema: withDescription(operation.inputSchema as JsonSchema, "The input payload for this action."),
    outputSchema: withDescription(operation.outputSchema as JsonSchema, "The output payload for this action."),
    followUpActions: buildFusionApiFollowUpActions(operation, operationByName),
    asyncLifecycle: buildFusionApiAsyncLifecycle(operation, operationByName),
  });
}

const fusionApiOperationByName = new Map(fusionApiOperations.map((operation) => [operation.actionName, operation]));

export const fusionApiActions: ActionDefinition[] = fusionApiOperations.map((operation) =>
  buildFusionApiAction(operation, fusionApiOperationByName),
);

export type FusionApiActionName = (typeof fusionApiOperations)[number]["actionName"];
