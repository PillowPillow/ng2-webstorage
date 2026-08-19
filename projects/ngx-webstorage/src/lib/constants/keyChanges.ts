/**
 * Sentinel emitted on `StorageStrategy.keyChanges` when the whole storage was
 * cleared (as opposed to a single key changing).
 *
 * At runtime the value is `null`. The public `keyChanges` type deliberately
 * stays `Subject<string>` rather than `Subject<string | null>`: widening it is
 * a source break for every consumer that subscribes, not just for third-party
 * strategy implementors, and this release deliberately supports Angular 21
 * consumers. Revisit in v23.
 *
 * This constant is intentionally NOT part of the public API surface
 * (not re-exported from public_api.ts): it centralises the cast and the
 * rationale so every emission and comparison site shares one definition.
 */
export const KEY_CLEARED: string = null as unknown as string;
