/**
 * Standard return type for all Server Actions.
 * UI Agent destructures this to show success/error states.
 */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };
