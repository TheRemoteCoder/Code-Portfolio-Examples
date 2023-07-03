/**
 * Publish/Subscribe pattern event type.
 *
 * @todo  TSlint/IDE should validate if keys exist in defined objects from this type.
 */
export type PubSubEvents = {
  /**
   * Syntax  : {eventId : 'Class:eventId'}
   * Example : {onStart : 'Example:onStart'}
   */
  readonly publish?: { [key: string]: string };

  /**
   * Syntax  : {classEventId   : 'Class:eventId'}
   * Example : {exampleOnStart : 'Example:onStart'}
   */
  readonly subscribe?: { [key: string]: string };
};
