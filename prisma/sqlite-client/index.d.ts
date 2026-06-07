
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Book
 * 
 */
export type Book = $Result.DefaultSelection<Prisma.$BookPayload>
/**
 * Model Anime
 * 
 */
export type Anime = $Result.DefaultSelection<Prisma.$AnimePayload>
/**
 * Model Music
 * 
 */
export type Music = $Result.DefaultSelection<Prisma.$MusicPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model MusicTag
 * 
 */
export type MusicTag = $Result.DefaultSelection<Prisma.$MusicTagPayload>
/**
 * Model BookTag
 * 
 */
export type BookTag = $Result.DefaultSelection<Prisma.$BookTagPayload>
/**
 * Model AnimeTag
 * 
 */
export type AnimeTag = $Result.DefaultSelection<Prisma.$AnimeTagPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Books
 * const books = await prisma.book.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Books
   * const books = await prisma.book.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.book`: Exposes CRUD operations for the **Book** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Books
    * const books = await prisma.book.findMany()
    * ```
    */
  get book(): Prisma.BookDelegate<ExtArgs>;

  /**
   * `prisma.anime`: Exposes CRUD operations for the **Anime** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Anime
    * const anime = await prisma.anime.findMany()
    * ```
    */
  get anime(): Prisma.AnimeDelegate<ExtArgs>;

  /**
   * `prisma.music`: Exposes CRUD operations for the **Music** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Music
    * const music = await prisma.music.findMany()
    * ```
    */
  get music(): Prisma.MusicDelegate<ExtArgs>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs>;

  /**
   * `prisma.musicTag`: Exposes CRUD operations for the **MusicTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MusicTags
    * const musicTags = await prisma.musicTag.findMany()
    * ```
    */
  get musicTag(): Prisma.MusicTagDelegate<ExtArgs>;

  /**
   * `prisma.bookTag`: Exposes CRUD operations for the **BookTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BookTags
    * const bookTags = await prisma.bookTag.findMany()
    * ```
    */
  get bookTag(): Prisma.BookTagDelegate<ExtArgs>;

  /**
   * `prisma.animeTag`: Exposes CRUD operations for the **AnimeTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnimeTags
    * const animeTags = await prisma.animeTag.findMany()
    * ```
    */
  get animeTag(): Prisma.AnimeTagDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Book: 'Book',
    Anime: 'Anime',
    Music: 'Music',
    Tag: 'Tag',
    MusicTag: 'MusicTag',
    BookTag: 'BookTag',
    AnimeTag: 'AnimeTag'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "book" | "anime" | "music" | "tag" | "musicTag" | "bookTag" | "animeTag"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Book: {
        payload: Prisma.$BookPayload<ExtArgs>
        fields: Prisma.BookFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findFirst: {
            args: Prisma.BookFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          findMany: {
            args: Prisma.BookFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          create: {
            args: Prisma.BookCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          createMany: {
            args: Prisma.BookCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>[]
          }
          delete: {
            args: Prisma.BookDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          update: {
            args: Prisma.BookUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          deleteMany: {
            args: Prisma.BookDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookPayload>
          }
          aggregate: {
            args: Prisma.BookAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBook>
          }
          groupBy: {
            args: Prisma.BookGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookCountArgs<ExtArgs>
            result: $Utils.Optional<BookCountAggregateOutputType> | number
          }
        }
      }
      Anime: {
        payload: Prisma.$AnimePayload<ExtArgs>
        fields: Prisma.AnimeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnimeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnimeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          findFirst: {
            args: Prisma.AnimeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnimeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          findMany: {
            args: Prisma.AnimeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>[]
          }
          create: {
            args: Prisma.AnimeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          createMany: {
            args: Prisma.AnimeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnimeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>[]
          }
          delete: {
            args: Prisma.AnimeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          update: {
            args: Prisma.AnimeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          deleteMany: {
            args: Prisma.AnimeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnimeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnimeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimePayload>
          }
          aggregate: {
            args: Prisma.AnimeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnime>
          }
          groupBy: {
            args: Prisma.AnimeGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnimeGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnimeCountArgs<ExtArgs>
            result: $Utils.Optional<AnimeCountAggregateOutputType> | number
          }
        }
      }
      Music: {
        payload: Prisma.$MusicPayload<ExtArgs>
        fields: Prisma.MusicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MusicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MusicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicPayload>
          }
          findFirst: {
            args: Prisma.MusicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MusicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicPayload>
          }
          findMany: {
            args: Prisma.MusicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicPayload>[]
          }
          create: {
            args: Prisma.MusicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicPayload>
          }
          createMany: {
            args: Prisma.MusicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MusicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicPayload>[]
          }
          delete: {
            args: Prisma.MusicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicPayload>
          }
          update: {
            args: Prisma.MusicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicPayload>
          }
          deleteMany: {
            args: Prisma.MusicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MusicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MusicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicPayload>
          }
          aggregate: {
            args: Prisma.MusicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMusic>
          }
          groupBy: {
            args: Prisma.MusicGroupByArgs<ExtArgs>
            result: $Utils.Optional<MusicGroupByOutputType>[]
          }
          count: {
            args: Prisma.MusicCountArgs<ExtArgs>
            result: $Utils.Optional<MusicCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      MusicTag: {
        payload: Prisma.$MusicTagPayload<ExtArgs>
        fields: Prisma.MusicTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MusicTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MusicTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicTagPayload>
          }
          findFirst: {
            args: Prisma.MusicTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MusicTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicTagPayload>
          }
          findMany: {
            args: Prisma.MusicTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicTagPayload>[]
          }
          create: {
            args: Prisma.MusicTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicTagPayload>
          }
          createMany: {
            args: Prisma.MusicTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MusicTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicTagPayload>[]
          }
          delete: {
            args: Prisma.MusicTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicTagPayload>
          }
          update: {
            args: Prisma.MusicTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicTagPayload>
          }
          deleteMany: {
            args: Prisma.MusicTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MusicTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MusicTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MusicTagPayload>
          }
          aggregate: {
            args: Prisma.MusicTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMusicTag>
          }
          groupBy: {
            args: Prisma.MusicTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<MusicTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.MusicTagCountArgs<ExtArgs>
            result: $Utils.Optional<MusicTagCountAggregateOutputType> | number
          }
        }
      }
      BookTag: {
        payload: Prisma.$BookTagPayload<ExtArgs>
        fields: Prisma.BookTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BookTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BookTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTagPayload>
          }
          findFirst: {
            args: Prisma.BookTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BookTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTagPayload>
          }
          findMany: {
            args: Prisma.BookTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTagPayload>[]
          }
          create: {
            args: Prisma.BookTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTagPayload>
          }
          createMany: {
            args: Prisma.BookTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BookTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTagPayload>[]
          }
          delete: {
            args: Prisma.BookTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTagPayload>
          }
          update: {
            args: Prisma.BookTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTagPayload>
          }
          deleteMany: {
            args: Prisma.BookTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BookTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BookTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BookTagPayload>
          }
          aggregate: {
            args: Prisma.BookTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBookTag>
          }
          groupBy: {
            args: Prisma.BookTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<BookTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.BookTagCountArgs<ExtArgs>
            result: $Utils.Optional<BookTagCountAggregateOutputType> | number
          }
        }
      }
      AnimeTag: {
        payload: Prisma.$AnimeTagPayload<ExtArgs>
        fields: Prisma.AnimeTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnimeTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnimeTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeTagPayload>
          }
          findFirst: {
            args: Prisma.AnimeTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnimeTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeTagPayload>
          }
          findMany: {
            args: Prisma.AnimeTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeTagPayload>[]
          }
          create: {
            args: Prisma.AnimeTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeTagPayload>
          }
          createMany: {
            args: Prisma.AnimeTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnimeTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeTagPayload>[]
          }
          delete: {
            args: Prisma.AnimeTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeTagPayload>
          }
          update: {
            args: Prisma.AnimeTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeTagPayload>
          }
          deleteMany: {
            args: Prisma.AnimeTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnimeTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnimeTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnimeTagPayload>
          }
          aggregate: {
            args: Prisma.AnimeTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnimeTag>
          }
          groupBy: {
            args: Prisma.AnimeTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnimeTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnimeTagCountArgs<ExtArgs>
            result: $Utils.Optional<AnimeTagCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BookCountOutputType
   */

  export type BookCountOutputType = {
    tags: number
  }

  export type BookCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | BookCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookCountOutputType
     */
    select?: BookCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BookCountOutputType without action
   */
  export type BookCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookTagWhereInput
  }


  /**
   * Count Type AnimeCountOutputType
   */

  export type AnimeCountOutputType = {
    tags: number
  }

  export type AnimeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | AnimeCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * AnimeCountOutputType without action
   */
  export type AnimeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeCountOutputType
     */
    select?: AnimeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AnimeCountOutputType without action
   */
  export type AnimeCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimeTagWhereInput
  }


  /**
   * Count Type MusicCountOutputType
   */

  export type MusicCountOutputType = {
    tags: number
  }

  export type MusicCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | MusicCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * MusicCountOutputType without action
   */
  export type MusicCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicCountOutputType
     */
    select?: MusicCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MusicCountOutputType without action
   */
  export type MusicCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicTagWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    books: number
    animes: number
    musics: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | TagCountOutputTypeCountBooksArgs
    animes?: boolean | TagCountOutputTypeCountAnimesArgs
    musics?: boolean | TagCountOutputTypeCountMusicsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountBooksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookTagWhereInput
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountAnimesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimeTagWhereInput
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountMusicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Book
   */

  export type AggregateBook = {
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  export type BookAvgAggregateOutputType = {
    id: number | null
    publishYear: number | null
    rating: number | null
  }

  export type BookSumAggregateOutputType = {
    id: number | null
    publishYear: number | null
    rating: number | null
  }

  export type BookMinAggregateOutputType = {
    id: number | null
    title: string | null
    author: string | null
    publisher: string | null
    publishYear: number | null
    isbn: string | null
    coverUrl: string | null
    description: string | null
    status: string | null
    rating: number | null
    notes: string | null
    startDate: Date | null
    finishDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookMaxAggregateOutputType = {
    id: number | null
    title: string | null
    author: string | null
    publisher: string | null
    publishYear: number | null
    isbn: string | null
    coverUrl: string | null
    description: string | null
    status: string | null
    rating: number | null
    notes: string | null
    startDate: Date | null
    finishDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BookCountAggregateOutputType = {
    id: number
    title: number
    author: number
    publisher: number
    publishYear: number
    isbn: number
    coverUrl: number
    description: number
    status: number
    rating: number
    notes: number
    startDate: number
    finishDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BookAvgAggregateInputType = {
    id?: true
    publishYear?: true
    rating?: true
  }

  export type BookSumAggregateInputType = {
    id?: true
    publishYear?: true
    rating?: true
  }

  export type BookMinAggregateInputType = {
    id?: true
    title?: true
    author?: true
    publisher?: true
    publishYear?: true
    isbn?: true
    coverUrl?: true
    description?: true
    status?: true
    rating?: true
    notes?: true
    startDate?: true
    finishDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookMaxAggregateInputType = {
    id?: true
    title?: true
    author?: true
    publisher?: true
    publishYear?: true
    isbn?: true
    coverUrl?: true
    description?: true
    status?: true
    rating?: true
    notes?: true
    startDate?: true
    finishDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BookCountAggregateInputType = {
    id?: true
    title?: true
    author?: true
    publisher?: true
    publishYear?: true
    isbn?: true
    coverUrl?: true
    description?: true
    status?: true
    rating?: true
    notes?: true
    startDate?: true
    finishDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BookAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Book to aggregate.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Books
    **/
    _count?: true | BookCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookMaxAggregateInputType
  }

  export type GetBookAggregateType<T extends BookAggregateArgs> = {
        [P in keyof T & keyof AggregateBook]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBook[P]>
      : GetScalarType<T[P], AggregateBook[P]>
  }




  export type BookGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookWhereInput
    orderBy?: BookOrderByWithAggregationInput | BookOrderByWithAggregationInput[]
    by: BookScalarFieldEnum[] | BookScalarFieldEnum
    having?: BookScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookCountAggregateInputType | true
    _avg?: BookAvgAggregateInputType
    _sum?: BookSumAggregateInputType
    _min?: BookMinAggregateInputType
    _max?: BookMaxAggregateInputType
  }

  export type BookGroupByOutputType = {
    id: number
    title: string
    author: string
    publisher: string | null
    publishYear: number | null
    isbn: string | null
    coverUrl: string | null
    description: string | null
    status: string
    rating: number | null
    notes: string | null
    startDate: Date | null
    finishDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: BookCountAggregateOutputType | null
    _avg: BookAvgAggregateOutputType | null
    _sum: BookSumAggregateOutputType | null
    _min: BookMinAggregateOutputType | null
    _max: BookMaxAggregateOutputType | null
  }

  type GetBookGroupByPayload<T extends BookGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookGroupByOutputType[P]>
            : GetScalarType<T[P], BookGroupByOutputType[P]>
        }
      >
    >


  export type BookSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    publisher?: boolean
    publishYear?: boolean
    isbn?: boolean
    coverUrl?: boolean
    description?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    startDate?: boolean
    finishDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean | Book$tagsArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["book"]>

  export type BookSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    author?: boolean
    publisher?: boolean
    publishYear?: boolean
    isbn?: boolean
    coverUrl?: boolean
    description?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    startDate?: boolean
    finishDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["book"]>

  export type BookSelectScalar = {
    id?: boolean
    title?: boolean
    author?: boolean
    publisher?: boolean
    publishYear?: boolean
    isbn?: boolean
    coverUrl?: boolean
    description?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    startDate?: boolean
    finishDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BookInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | Book$tagsArgs<ExtArgs>
    _count?: boolean | BookCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BookIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BookPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Book"
    objects: {
      tags: Prisma.$BookTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      author: string
      publisher: string | null
      publishYear: number | null
      isbn: string | null
      coverUrl: string | null
      description: string | null
      status: string
      rating: number | null
      notes: string | null
      startDate: Date | null
      finishDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["book"]>
    composites: {}
  }

  type BookGetPayload<S extends boolean | null | undefined | BookDefaultArgs> = $Result.GetResult<Prisma.$BookPayload, S>

  type BookCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BookFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BookCountAggregateInputType | true
    }

  export interface BookDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Book'], meta: { name: 'Book' } }
    /**
     * Find zero or one Book that matches the filter.
     * @param {BookFindUniqueArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookFindUniqueArgs>(args: SelectSubset<T, BookFindUniqueArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Book that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BookFindUniqueOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookFindUniqueOrThrowArgs>(args: SelectSubset<T, BookFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Book that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookFindFirstArgs>(args?: SelectSubset<T, BookFindFirstArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Book that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindFirstOrThrowArgs} args - Arguments to find a Book
     * @example
     * // Get one Book
     * const book = await prisma.book.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookFindFirstOrThrowArgs>(args?: SelectSubset<T, BookFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Books that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Books
     * const books = await prisma.book.findMany()
     * 
     * // Get first 10 Books
     * const books = await prisma.book.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bookWithIdOnly = await prisma.book.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BookFindManyArgs>(args?: SelectSubset<T, BookFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Book.
     * @param {BookCreateArgs} args - Arguments to create a Book.
     * @example
     * // Create one Book
     * const Book = await prisma.book.create({
     *   data: {
     *     // ... data to create a Book
     *   }
     * })
     * 
     */
    create<T extends BookCreateArgs>(args: SelectSubset<T, BookCreateArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Books.
     * @param {BookCreateManyArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const book = await prisma.book.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookCreateManyArgs>(args?: SelectSubset<T, BookCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Books and returns the data saved in the database.
     * @param {BookCreateManyAndReturnArgs} args - Arguments to create many Books.
     * @example
     * // Create many Books
     * const book = await prisma.book.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Books and only return the `id`
     * const bookWithIdOnly = await prisma.book.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookCreateManyAndReturnArgs>(args?: SelectSubset<T, BookCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Book.
     * @param {BookDeleteArgs} args - Arguments to delete one Book.
     * @example
     * // Delete one Book
     * const Book = await prisma.book.delete({
     *   where: {
     *     // ... filter to delete one Book
     *   }
     * })
     * 
     */
    delete<T extends BookDeleteArgs>(args: SelectSubset<T, BookDeleteArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Book.
     * @param {BookUpdateArgs} args - Arguments to update one Book.
     * @example
     * // Update one Book
     * const book = await prisma.book.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookUpdateArgs>(args: SelectSubset<T, BookUpdateArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Books.
     * @param {BookDeleteManyArgs} args - Arguments to filter Books to delete.
     * @example
     * // Delete a few Books
     * const { count } = await prisma.book.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookDeleteManyArgs>(args?: SelectSubset<T, BookDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Books
     * const book = await prisma.book.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookUpdateManyArgs>(args: SelectSubset<T, BookUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Book.
     * @param {BookUpsertArgs} args - Arguments to update or create a Book.
     * @example
     * // Update or create a Book
     * const book = await prisma.book.upsert({
     *   create: {
     *     // ... data to create a Book
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Book we want to update
     *   }
     * })
     */
    upsert<T extends BookUpsertArgs>(args: SelectSubset<T, BookUpsertArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Books.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookCountArgs} args - Arguments to filter Books to count.
     * @example
     * // Count the number of Books
     * const count = await prisma.book.count({
     *   where: {
     *     // ... the filter for the Books we want to count
     *   }
     * })
    **/
    count<T extends BookCountArgs>(
      args?: Subset<T, BookCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookAggregateArgs>(args: Subset<T, BookAggregateArgs>): Prisma.PrismaPromise<GetBookAggregateType<T>>

    /**
     * Group by Book.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookGroupByArgs['orderBy'] }
        : { orderBy?: BookGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Book model
   */
  readonly fields: BookFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Book.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tags<T extends Book$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Book$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Book model
   */ 
  interface BookFieldRefs {
    readonly id: FieldRef<"Book", 'Int'>
    readonly title: FieldRef<"Book", 'String'>
    readonly author: FieldRef<"Book", 'String'>
    readonly publisher: FieldRef<"Book", 'String'>
    readonly publishYear: FieldRef<"Book", 'Int'>
    readonly isbn: FieldRef<"Book", 'String'>
    readonly coverUrl: FieldRef<"Book", 'String'>
    readonly description: FieldRef<"Book", 'String'>
    readonly status: FieldRef<"Book", 'String'>
    readonly rating: FieldRef<"Book", 'Int'>
    readonly notes: FieldRef<"Book", 'String'>
    readonly startDate: FieldRef<"Book", 'DateTime'>
    readonly finishDate: FieldRef<"Book", 'DateTime'>
    readonly createdAt: FieldRef<"Book", 'DateTime'>
    readonly updatedAt: FieldRef<"Book", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Book findUnique
   */
  export type BookFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findUniqueOrThrow
   */
  export type BookFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book findFirst
   */
  export type BookFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findFirstOrThrow
   */
  export type BookFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Book to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Books.
     */
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book findMany
   */
  export type BookFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter, which Books to fetch.
     */
    where?: BookWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Books to fetch.
     */
    orderBy?: BookOrderByWithRelationInput | BookOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Books.
     */
    cursor?: BookWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Books from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Books.
     */
    skip?: number
    distinct?: BookScalarFieldEnum | BookScalarFieldEnum[]
  }

  /**
   * Book create
   */
  export type BookCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to create a Book.
     */
    data: XOR<BookCreateInput, BookUncheckedCreateInput>
  }

  /**
   * Book createMany
   */
  export type BookCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Books.
     */
    data: BookCreateManyInput | BookCreateManyInput[]
  }

  /**
   * Book createManyAndReturn
   */
  export type BookCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Books.
     */
    data: BookCreateManyInput | BookCreateManyInput[]
  }

  /**
   * Book update
   */
  export type BookUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The data needed to update a Book.
     */
    data: XOR<BookUpdateInput, BookUncheckedUpdateInput>
    /**
     * Choose, which Book to update.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book updateMany
   */
  export type BookUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Books.
     */
    data: XOR<BookUpdateManyMutationInput, BookUncheckedUpdateManyInput>
    /**
     * Filter which Books to update
     */
    where?: BookWhereInput
  }

  /**
   * Book upsert
   */
  export type BookUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * The filter to search for the Book to update in case it exists.
     */
    where: BookWhereUniqueInput
    /**
     * In case the Book found by the `where` argument doesn't exist, create a new Book with this data.
     */
    create: XOR<BookCreateInput, BookUncheckedCreateInput>
    /**
     * In case the Book was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookUpdateInput, BookUncheckedUpdateInput>
  }

  /**
   * Book delete
   */
  export type BookDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
    /**
     * Filter which Book to delete.
     */
    where: BookWhereUniqueInput
  }

  /**
   * Book deleteMany
   */
  export type BookDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Books to delete
     */
    where?: BookWhereInput
  }

  /**
   * Book.tags
   */
  export type Book$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    where?: BookTagWhereInput
    orderBy?: BookTagOrderByWithRelationInput | BookTagOrderByWithRelationInput[]
    cursor?: BookTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookTagScalarFieldEnum | BookTagScalarFieldEnum[]
  }

  /**
   * Book without action
   */
  export type BookDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Book
     */
    select?: BookSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookInclude<ExtArgs> | null
  }


  /**
   * Model Anime
   */

  export type AggregateAnime = {
    _count: AnimeCountAggregateOutputType | null
    _avg: AnimeAvgAggregateOutputType | null
    _sum: AnimeSumAggregateOutputType | null
    _min: AnimeMinAggregateOutputType | null
    _max: AnimeMaxAggregateOutputType | null
  }

  export type AnimeAvgAggregateOutputType = {
    id: number | null
    totalEpisodes: number | null
    watchedEpisodes: number | null
    bangumiId: number | null
    rating: number | null
  }

  export type AnimeSumAggregateOutputType = {
    id: number | null
    totalEpisodes: number | null
    watchedEpisodes: number | null
    bangumiId: number | null
    rating: number | null
  }

  export type AnimeMinAggregateOutputType = {
    id: number | null
    titleCn: string | null
    titleJp: string | null
    coverUrl: string | null
    summary: string | null
    studio: string | null
    airDate: Date | null
    totalEpisodes: number | null
    watchedEpisodes: number | null
    bangumiId: number | null
    status: string | null
    rating: number | null
    notes: string | null
    startDate: Date | null
    finishDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnimeMaxAggregateOutputType = {
    id: number | null
    titleCn: string | null
    titleJp: string | null
    coverUrl: string | null
    summary: string | null
    studio: string | null
    airDate: Date | null
    totalEpisodes: number | null
    watchedEpisodes: number | null
    bangumiId: number | null
    status: string | null
    rating: number | null
    notes: string | null
    startDate: Date | null
    finishDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AnimeCountAggregateOutputType = {
    id: number
    titleCn: number
    titleJp: number
    coverUrl: number
    summary: number
    studio: number
    airDate: number
    totalEpisodes: number
    watchedEpisodes: number
    bangumiId: number
    status: number
    rating: number
    notes: number
    startDate: number
    finishDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AnimeAvgAggregateInputType = {
    id?: true
    totalEpisodes?: true
    watchedEpisodes?: true
    bangumiId?: true
    rating?: true
  }

  export type AnimeSumAggregateInputType = {
    id?: true
    totalEpisodes?: true
    watchedEpisodes?: true
    bangumiId?: true
    rating?: true
  }

  export type AnimeMinAggregateInputType = {
    id?: true
    titleCn?: true
    titleJp?: true
    coverUrl?: true
    summary?: true
    studio?: true
    airDate?: true
    totalEpisodes?: true
    watchedEpisodes?: true
    bangumiId?: true
    status?: true
    rating?: true
    notes?: true
    startDate?: true
    finishDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnimeMaxAggregateInputType = {
    id?: true
    titleCn?: true
    titleJp?: true
    coverUrl?: true
    summary?: true
    studio?: true
    airDate?: true
    totalEpisodes?: true
    watchedEpisodes?: true
    bangumiId?: true
    status?: true
    rating?: true
    notes?: true
    startDate?: true
    finishDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AnimeCountAggregateInputType = {
    id?: true
    titleCn?: true
    titleJp?: true
    coverUrl?: true
    summary?: true
    studio?: true
    airDate?: true
    totalEpisodes?: true
    watchedEpisodes?: true
    bangumiId?: true
    status?: true
    rating?: true
    notes?: true
    startDate?: true
    finishDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AnimeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Anime to aggregate.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Anime
    **/
    _count?: true | AnimeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnimeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnimeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnimeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnimeMaxAggregateInputType
  }

  export type GetAnimeAggregateType<T extends AnimeAggregateArgs> = {
        [P in keyof T & keyof AggregateAnime]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnime[P]>
      : GetScalarType<T[P], AggregateAnime[P]>
  }




  export type AnimeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimeWhereInput
    orderBy?: AnimeOrderByWithAggregationInput | AnimeOrderByWithAggregationInput[]
    by: AnimeScalarFieldEnum[] | AnimeScalarFieldEnum
    having?: AnimeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnimeCountAggregateInputType | true
    _avg?: AnimeAvgAggregateInputType
    _sum?: AnimeSumAggregateInputType
    _min?: AnimeMinAggregateInputType
    _max?: AnimeMaxAggregateInputType
  }

  export type AnimeGroupByOutputType = {
    id: number
    titleCn: string
    titleJp: string | null
    coverUrl: string | null
    summary: string | null
    studio: string | null
    airDate: Date | null
    totalEpisodes: number | null
    watchedEpisodes: number
    bangumiId: number | null
    status: string
    rating: number | null
    notes: string | null
    startDate: Date | null
    finishDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AnimeCountAggregateOutputType | null
    _avg: AnimeAvgAggregateOutputType | null
    _sum: AnimeSumAggregateOutputType | null
    _min: AnimeMinAggregateOutputType | null
    _max: AnimeMaxAggregateOutputType | null
  }

  type GetAnimeGroupByPayload<T extends AnimeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnimeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnimeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnimeGroupByOutputType[P]>
            : GetScalarType<T[P], AnimeGroupByOutputType[P]>
        }
      >
    >


  export type AnimeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titleCn?: boolean
    titleJp?: boolean
    coverUrl?: boolean
    summary?: boolean
    studio?: boolean
    airDate?: boolean
    totalEpisodes?: boolean
    watchedEpisodes?: boolean
    bangumiId?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    startDate?: boolean
    finishDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean | Anime$tagsArgs<ExtArgs>
    _count?: boolean | AnimeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["anime"]>

  export type AnimeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titleCn?: boolean
    titleJp?: boolean
    coverUrl?: boolean
    summary?: boolean
    studio?: boolean
    airDate?: boolean
    totalEpisodes?: boolean
    watchedEpisodes?: boolean
    bangumiId?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    startDate?: boolean
    finishDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["anime"]>

  export type AnimeSelectScalar = {
    id?: boolean
    titleCn?: boolean
    titleJp?: boolean
    coverUrl?: boolean
    summary?: boolean
    studio?: boolean
    airDate?: boolean
    totalEpisodes?: boolean
    watchedEpisodes?: boolean
    bangumiId?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    startDate?: boolean
    finishDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AnimeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | Anime$tagsArgs<ExtArgs>
    _count?: boolean | AnimeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AnimeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AnimePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Anime"
    objects: {
      tags: Prisma.$AnimeTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      titleCn: string
      titleJp: string | null
      coverUrl: string | null
      summary: string | null
      studio: string | null
      airDate: Date | null
      totalEpisodes: number | null
      watchedEpisodes: number
      bangumiId: number | null
      status: string
      rating: number | null
      notes: string | null
      startDate: Date | null
      finishDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["anime"]>
    composites: {}
  }

  type AnimeGetPayload<S extends boolean | null | undefined | AnimeDefaultArgs> = $Result.GetResult<Prisma.$AnimePayload, S>

  type AnimeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AnimeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AnimeCountAggregateInputType | true
    }

  export interface AnimeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Anime'], meta: { name: 'Anime' } }
    /**
     * Find zero or one Anime that matches the filter.
     * @param {AnimeFindUniqueArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnimeFindUniqueArgs>(args: SelectSubset<T, AnimeFindUniqueArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Anime that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AnimeFindUniqueOrThrowArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnimeFindUniqueOrThrowArgs>(args: SelectSubset<T, AnimeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Anime that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeFindFirstArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnimeFindFirstArgs>(args?: SelectSubset<T, AnimeFindFirstArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Anime that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeFindFirstOrThrowArgs} args - Arguments to find a Anime
     * @example
     * // Get one Anime
     * const anime = await prisma.anime.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnimeFindFirstOrThrowArgs>(args?: SelectSubset<T, AnimeFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Anime that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Anime
     * const anime = await prisma.anime.findMany()
     * 
     * // Get first 10 Anime
     * const anime = await prisma.anime.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const animeWithIdOnly = await prisma.anime.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnimeFindManyArgs>(args?: SelectSubset<T, AnimeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Anime.
     * @param {AnimeCreateArgs} args - Arguments to create a Anime.
     * @example
     * // Create one Anime
     * const Anime = await prisma.anime.create({
     *   data: {
     *     // ... data to create a Anime
     *   }
     * })
     * 
     */
    create<T extends AnimeCreateArgs>(args: SelectSubset<T, AnimeCreateArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Anime.
     * @param {AnimeCreateManyArgs} args - Arguments to create many Anime.
     * @example
     * // Create many Anime
     * const anime = await prisma.anime.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnimeCreateManyArgs>(args?: SelectSubset<T, AnimeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Anime and returns the data saved in the database.
     * @param {AnimeCreateManyAndReturnArgs} args - Arguments to create many Anime.
     * @example
     * // Create many Anime
     * const anime = await prisma.anime.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Anime and only return the `id`
     * const animeWithIdOnly = await prisma.anime.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnimeCreateManyAndReturnArgs>(args?: SelectSubset<T, AnimeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Anime.
     * @param {AnimeDeleteArgs} args - Arguments to delete one Anime.
     * @example
     * // Delete one Anime
     * const Anime = await prisma.anime.delete({
     *   where: {
     *     // ... filter to delete one Anime
     *   }
     * })
     * 
     */
    delete<T extends AnimeDeleteArgs>(args: SelectSubset<T, AnimeDeleteArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Anime.
     * @param {AnimeUpdateArgs} args - Arguments to update one Anime.
     * @example
     * // Update one Anime
     * const anime = await prisma.anime.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnimeUpdateArgs>(args: SelectSubset<T, AnimeUpdateArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Anime.
     * @param {AnimeDeleteManyArgs} args - Arguments to filter Anime to delete.
     * @example
     * // Delete a few Anime
     * const { count } = await prisma.anime.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnimeDeleteManyArgs>(args?: SelectSubset<T, AnimeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Anime
     * const anime = await prisma.anime.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnimeUpdateManyArgs>(args: SelectSubset<T, AnimeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Anime.
     * @param {AnimeUpsertArgs} args - Arguments to update or create a Anime.
     * @example
     * // Update or create a Anime
     * const anime = await prisma.anime.upsert({
     *   create: {
     *     // ... data to create a Anime
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Anime we want to update
     *   }
     * })
     */
    upsert<T extends AnimeUpsertArgs>(args: SelectSubset<T, AnimeUpsertArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeCountArgs} args - Arguments to filter Anime to count.
     * @example
     * // Count the number of Anime
     * const count = await prisma.anime.count({
     *   where: {
     *     // ... the filter for the Anime we want to count
     *   }
     * })
    **/
    count<T extends AnimeCountArgs>(
      args?: Subset<T, AnimeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnimeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnimeAggregateArgs>(args: Subset<T, AnimeAggregateArgs>): Prisma.PrismaPromise<GetAnimeAggregateType<T>>

    /**
     * Group by Anime.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnimeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnimeGroupByArgs['orderBy'] }
        : { orderBy?: AnimeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnimeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnimeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Anime model
   */
  readonly fields: AnimeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Anime.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnimeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tags<T extends Anime$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Anime$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Anime model
   */ 
  interface AnimeFieldRefs {
    readonly id: FieldRef<"Anime", 'Int'>
    readonly titleCn: FieldRef<"Anime", 'String'>
    readonly titleJp: FieldRef<"Anime", 'String'>
    readonly coverUrl: FieldRef<"Anime", 'String'>
    readonly summary: FieldRef<"Anime", 'String'>
    readonly studio: FieldRef<"Anime", 'String'>
    readonly airDate: FieldRef<"Anime", 'DateTime'>
    readonly totalEpisodes: FieldRef<"Anime", 'Int'>
    readonly watchedEpisodes: FieldRef<"Anime", 'Int'>
    readonly bangumiId: FieldRef<"Anime", 'Int'>
    readonly status: FieldRef<"Anime", 'String'>
    readonly rating: FieldRef<"Anime", 'Int'>
    readonly notes: FieldRef<"Anime", 'String'>
    readonly startDate: FieldRef<"Anime", 'DateTime'>
    readonly finishDate: FieldRef<"Anime", 'DateTime'>
    readonly createdAt: FieldRef<"Anime", 'DateTime'>
    readonly updatedAt: FieldRef<"Anime", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Anime findUnique
   */
  export type AnimeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime findUniqueOrThrow
   */
  export type AnimeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime findFirst
   */
  export type AnimeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Anime.
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anime.
     */
    distinct?: AnimeScalarFieldEnum | AnimeScalarFieldEnum[]
  }

  /**
   * Anime findFirstOrThrow
   */
  export type AnimeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Anime.
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Anime.
     */
    distinct?: AnimeScalarFieldEnum | AnimeScalarFieldEnum[]
  }

  /**
   * Anime findMany
   */
  export type AnimeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter, which Anime to fetch.
     */
    where?: AnimeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Anime to fetch.
     */
    orderBy?: AnimeOrderByWithRelationInput | AnimeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Anime.
     */
    cursor?: AnimeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Anime from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Anime.
     */
    skip?: number
    distinct?: AnimeScalarFieldEnum | AnimeScalarFieldEnum[]
  }

  /**
   * Anime create
   */
  export type AnimeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * The data needed to create a Anime.
     */
    data: XOR<AnimeCreateInput, AnimeUncheckedCreateInput>
  }

  /**
   * Anime createMany
   */
  export type AnimeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Anime.
     */
    data: AnimeCreateManyInput | AnimeCreateManyInput[]
  }

  /**
   * Anime createManyAndReturn
   */
  export type AnimeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Anime.
     */
    data: AnimeCreateManyInput | AnimeCreateManyInput[]
  }

  /**
   * Anime update
   */
  export type AnimeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * The data needed to update a Anime.
     */
    data: XOR<AnimeUpdateInput, AnimeUncheckedUpdateInput>
    /**
     * Choose, which Anime to update.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime updateMany
   */
  export type AnimeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Anime.
     */
    data: XOR<AnimeUpdateManyMutationInput, AnimeUncheckedUpdateManyInput>
    /**
     * Filter which Anime to update
     */
    where?: AnimeWhereInput
  }

  /**
   * Anime upsert
   */
  export type AnimeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * The filter to search for the Anime to update in case it exists.
     */
    where: AnimeWhereUniqueInput
    /**
     * In case the Anime found by the `where` argument doesn't exist, create a new Anime with this data.
     */
    create: XOR<AnimeCreateInput, AnimeUncheckedCreateInput>
    /**
     * In case the Anime was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnimeUpdateInput, AnimeUncheckedUpdateInput>
  }

  /**
   * Anime delete
   */
  export type AnimeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
    /**
     * Filter which Anime to delete.
     */
    where: AnimeWhereUniqueInput
  }

  /**
   * Anime deleteMany
   */
  export type AnimeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Anime to delete
     */
    where?: AnimeWhereInput
  }

  /**
   * Anime.tags
   */
  export type Anime$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    where?: AnimeTagWhereInput
    orderBy?: AnimeTagOrderByWithRelationInput | AnimeTagOrderByWithRelationInput[]
    cursor?: AnimeTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimeTagScalarFieldEnum | AnimeTagScalarFieldEnum[]
  }

  /**
   * Anime without action
   */
  export type AnimeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Anime
     */
    select?: AnimeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeInclude<ExtArgs> | null
  }


  /**
   * Model Music
   */

  export type AggregateMusic = {
    _count: MusicCountAggregateOutputType | null
    _avg: MusicAvgAggregateOutputType | null
    _sum: MusicSumAggregateOutputType | null
    _min: MusicMinAggregateOutputType | null
    _max: MusicMaxAggregateOutputType | null
  }

  export type MusicAvgAggregateOutputType = {
    id: number | null
    duration: number | null
    rating: number | null
  }

  export type MusicSumAggregateOutputType = {
    id: number | null
    duration: number | null
    rating: number | null
  }

  export type MusicMinAggregateOutputType = {
    id: number | null
    title: string | null
    artist: string | null
    album: string | null
    coverUrl: string | null
    qqMusicId: string | null
    playlistId: string | null
    duration: number | null
    status: string | null
    rating: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MusicMaxAggregateOutputType = {
    id: number | null
    title: string | null
    artist: string | null
    album: string | null
    coverUrl: string | null
    qqMusicId: string | null
    playlistId: string | null
    duration: number | null
    status: string | null
    rating: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MusicCountAggregateOutputType = {
    id: number
    title: number
    artist: number
    album: number
    coverUrl: number
    qqMusicId: number
    playlistId: number
    duration: number
    status: number
    rating: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MusicAvgAggregateInputType = {
    id?: true
    duration?: true
    rating?: true
  }

  export type MusicSumAggregateInputType = {
    id?: true
    duration?: true
    rating?: true
  }

  export type MusicMinAggregateInputType = {
    id?: true
    title?: true
    artist?: true
    album?: true
    coverUrl?: true
    qqMusicId?: true
    playlistId?: true
    duration?: true
    status?: true
    rating?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MusicMaxAggregateInputType = {
    id?: true
    title?: true
    artist?: true
    album?: true
    coverUrl?: true
    qqMusicId?: true
    playlistId?: true
    duration?: true
    status?: true
    rating?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MusicCountAggregateInputType = {
    id?: true
    title?: true
    artist?: true
    album?: true
    coverUrl?: true
    qqMusicId?: true
    playlistId?: true
    duration?: true
    status?: true
    rating?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MusicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Music to aggregate.
     */
    where?: MusicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Music to fetch.
     */
    orderBy?: MusicOrderByWithRelationInput | MusicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MusicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Music from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Music.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Music
    **/
    _count?: true | MusicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MusicAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MusicSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MusicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MusicMaxAggregateInputType
  }

  export type GetMusicAggregateType<T extends MusicAggregateArgs> = {
        [P in keyof T & keyof AggregateMusic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMusic[P]>
      : GetScalarType<T[P], AggregateMusic[P]>
  }




  export type MusicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicWhereInput
    orderBy?: MusicOrderByWithAggregationInput | MusicOrderByWithAggregationInput[]
    by: MusicScalarFieldEnum[] | MusicScalarFieldEnum
    having?: MusicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MusicCountAggregateInputType | true
    _avg?: MusicAvgAggregateInputType
    _sum?: MusicSumAggregateInputType
    _min?: MusicMinAggregateInputType
    _max?: MusicMaxAggregateInputType
  }

  export type MusicGroupByOutputType = {
    id: number
    title: string
    artist: string
    album: string | null
    coverUrl: string | null
    qqMusicId: string | null
    playlistId: string | null
    duration: number | null
    status: string
    rating: number | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: MusicCountAggregateOutputType | null
    _avg: MusicAvgAggregateOutputType | null
    _sum: MusicSumAggregateOutputType | null
    _min: MusicMinAggregateOutputType | null
    _max: MusicMaxAggregateOutputType | null
  }

  type GetMusicGroupByPayload<T extends MusicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MusicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MusicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MusicGroupByOutputType[P]>
            : GetScalarType<T[P], MusicGroupByOutputType[P]>
        }
      >
    >


  export type MusicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    artist?: boolean
    album?: boolean
    coverUrl?: boolean
    qqMusicId?: boolean
    playlistId?: boolean
    duration?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    tags?: boolean | Music$tagsArgs<ExtArgs>
    _count?: boolean | MusicCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["music"]>

  export type MusicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    artist?: boolean
    album?: boolean
    coverUrl?: boolean
    qqMusicId?: boolean
    playlistId?: boolean
    duration?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["music"]>

  export type MusicSelectScalar = {
    id?: boolean
    title?: boolean
    artist?: boolean
    album?: boolean
    coverUrl?: boolean
    qqMusicId?: boolean
    playlistId?: boolean
    duration?: boolean
    status?: boolean
    rating?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MusicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | Music$tagsArgs<ExtArgs>
    _count?: boolean | MusicCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MusicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MusicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Music"
    objects: {
      tags: Prisma.$MusicTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      artist: string
      album: string | null
      coverUrl: string | null
      qqMusicId: string | null
      playlistId: string | null
      duration: number | null
      status: string
      rating: number | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["music"]>
    composites: {}
  }

  type MusicGetPayload<S extends boolean | null | undefined | MusicDefaultArgs> = $Result.GetResult<Prisma.$MusicPayload, S>

  type MusicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MusicFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MusicCountAggregateInputType | true
    }

  export interface MusicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Music'], meta: { name: 'Music' } }
    /**
     * Find zero or one Music that matches the filter.
     * @param {MusicFindUniqueArgs} args - Arguments to find a Music
     * @example
     * // Get one Music
     * const music = await prisma.music.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MusicFindUniqueArgs>(args: SelectSubset<T, MusicFindUniqueArgs<ExtArgs>>): Prisma__MusicClient<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Music that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MusicFindUniqueOrThrowArgs} args - Arguments to find a Music
     * @example
     * // Get one Music
     * const music = await prisma.music.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MusicFindUniqueOrThrowArgs>(args: SelectSubset<T, MusicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MusicClient<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Music that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicFindFirstArgs} args - Arguments to find a Music
     * @example
     * // Get one Music
     * const music = await prisma.music.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MusicFindFirstArgs>(args?: SelectSubset<T, MusicFindFirstArgs<ExtArgs>>): Prisma__MusicClient<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Music that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicFindFirstOrThrowArgs} args - Arguments to find a Music
     * @example
     * // Get one Music
     * const music = await prisma.music.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MusicFindFirstOrThrowArgs>(args?: SelectSubset<T, MusicFindFirstOrThrowArgs<ExtArgs>>): Prisma__MusicClient<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Music that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Music
     * const music = await prisma.music.findMany()
     * 
     * // Get first 10 Music
     * const music = await prisma.music.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const musicWithIdOnly = await prisma.music.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MusicFindManyArgs>(args?: SelectSubset<T, MusicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Music.
     * @param {MusicCreateArgs} args - Arguments to create a Music.
     * @example
     * // Create one Music
     * const Music = await prisma.music.create({
     *   data: {
     *     // ... data to create a Music
     *   }
     * })
     * 
     */
    create<T extends MusicCreateArgs>(args: SelectSubset<T, MusicCreateArgs<ExtArgs>>): Prisma__MusicClient<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Music.
     * @param {MusicCreateManyArgs} args - Arguments to create many Music.
     * @example
     * // Create many Music
     * const music = await prisma.music.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MusicCreateManyArgs>(args?: SelectSubset<T, MusicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Music and returns the data saved in the database.
     * @param {MusicCreateManyAndReturnArgs} args - Arguments to create many Music.
     * @example
     * // Create many Music
     * const music = await prisma.music.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Music and only return the `id`
     * const musicWithIdOnly = await prisma.music.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MusicCreateManyAndReturnArgs>(args?: SelectSubset<T, MusicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Music.
     * @param {MusicDeleteArgs} args - Arguments to delete one Music.
     * @example
     * // Delete one Music
     * const Music = await prisma.music.delete({
     *   where: {
     *     // ... filter to delete one Music
     *   }
     * })
     * 
     */
    delete<T extends MusicDeleteArgs>(args: SelectSubset<T, MusicDeleteArgs<ExtArgs>>): Prisma__MusicClient<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Music.
     * @param {MusicUpdateArgs} args - Arguments to update one Music.
     * @example
     * // Update one Music
     * const music = await prisma.music.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MusicUpdateArgs>(args: SelectSubset<T, MusicUpdateArgs<ExtArgs>>): Prisma__MusicClient<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Music.
     * @param {MusicDeleteManyArgs} args - Arguments to filter Music to delete.
     * @example
     * // Delete a few Music
     * const { count } = await prisma.music.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MusicDeleteManyArgs>(args?: SelectSubset<T, MusicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Music.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Music
     * const music = await prisma.music.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MusicUpdateManyArgs>(args: SelectSubset<T, MusicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Music.
     * @param {MusicUpsertArgs} args - Arguments to update or create a Music.
     * @example
     * // Update or create a Music
     * const music = await prisma.music.upsert({
     *   create: {
     *     // ... data to create a Music
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Music we want to update
     *   }
     * })
     */
    upsert<T extends MusicUpsertArgs>(args: SelectSubset<T, MusicUpsertArgs<ExtArgs>>): Prisma__MusicClient<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Music.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicCountArgs} args - Arguments to filter Music to count.
     * @example
     * // Count the number of Music
     * const count = await prisma.music.count({
     *   where: {
     *     // ... the filter for the Music we want to count
     *   }
     * })
    **/
    count<T extends MusicCountArgs>(
      args?: Subset<T, MusicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MusicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Music.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MusicAggregateArgs>(args: Subset<T, MusicAggregateArgs>): Prisma.PrismaPromise<GetMusicAggregateType<T>>

    /**
     * Group by Music.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MusicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MusicGroupByArgs['orderBy'] }
        : { orderBy?: MusicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MusicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMusicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Music model
   */
  readonly fields: MusicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Music.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MusicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tags<T extends Music$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Music$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Music model
   */ 
  interface MusicFieldRefs {
    readonly id: FieldRef<"Music", 'Int'>
    readonly title: FieldRef<"Music", 'String'>
    readonly artist: FieldRef<"Music", 'String'>
    readonly album: FieldRef<"Music", 'String'>
    readonly coverUrl: FieldRef<"Music", 'String'>
    readonly qqMusicId: FieldRef<"Music", 'String'>
    readonly playlistId: FieldRef<"Music", 'String'>
    readonly duration: FieldRef<"Music", 'Int'>
    readonly status: FieldRef<"Music", 'String'>
    readonly rating: FieldRef<"Music", 'Int'>
    readonly notes: FieldRef<"Music", 'String'>
    readonly createdAt: FieldRef<"Music", 'DateTime'>
    readonly updatedAt: FieldRef<"Music", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Music findUnique
   */
  export type MusicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicInclude<ExtArgs> | null
    /**
     * Filter, which Music to fetch.
     */
    where: MusicWhereUniqueInput
  }

  /**
   * Music findUniqueOrThrow
   */
  export type MusicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicInclude<ExtArgs> | null
    /**
     * Filter, which Music to fetch.
     */
    where: MusicWhereUniqueInput
  }

  /**
   * Music findFirst
   */
  export type MusicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicInclude<ExtArgs> | null
    /**
     * Filter, which Music to fetch.
     */
    where?: MusicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Music to fetch.
     */
    orderBy?: MusicOrderByWithRelationInput | MusicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Music.
     */
    cursor?: MusicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Music from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Music.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Music.
     */
    distinct?: MusicScalarFieldEnum | MusicScalarFieldEnum[]
  }

  /**
   * Music findFirstOrThrow
   */
  export type MusicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicInclude<ExtArgs> | null
    /**
     * Filter, which Music to fetch.
     */
    where?: MusicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Music to fetch.
     */
    orderBy?: MusicOrderByWithRelationInput | MusicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Music.
     */
    cursor?: MusicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Music from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Music.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Music.
     */
    distinct?: MusicScalarFieldEnum | MusicScalarFieldEnum[]
  }

  /**
   * Music findMany
   */
  export type MusicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicInclude<ExtArgs> | null
    /**
     * Filter, which Music to fetch.
     */
    where?: MusicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Music to fetch.
     */
    orderBy?: MusicOrderByWithRelationInput | MusicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Music.
     */
    cursor?: MusicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Music from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Music.
     */
    skip?: number
    distinct?: MusicScalarFieldEnum | MusicScalarFieldEnum[]
  }

  /**
   * Music create
   */
  export type MusicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicInclude<ExtArgs> | null
    /**
     * The data needed to create a Music.
     */
    data: XOR<MusicCreateInput, MusicUncheckedCreateInput>
  }

  /**
   * Music createMany
   */
  export type MusicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Music.
     */
    data: MusicCreateManyInput | MusicCreateManyInput[]
  }

  /**
   * Music createManyAndReturn
   */
  export type MusicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Music.
     */
    data: MusicCreateManyInput | MusicCreateManyInput[]
  }

  /**
   * Music update
   */
  export type MusicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicInclude<ExtArgs> | null
    /**
     * The data needed to update a Music.
     */
    data: XOR<MusicUpdateInput, MusicUncheckedUpdateInput>
    /**
     * Choose, which Music to update.
     */
    where: MusicWhereUniqueInput
  }

  /**
   * Music updateMany
   */
  export type MusicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Music.
     */
    data: XOR<MusicUpdateManyMutationInput, MusicUncheckedUpdateManyInput>
    /**
     * Filter which Music to update
     */
    where?: MusicWhereInput
  }

  /**
   * Music upsert
   */
  export type MusicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicInclude<ExtArgs> | null
    /**
     * The filter to search for the Music to update in case it exists.
     */
    where: MusicWhereUniqueInput
    /**
     * In case the Music found by the `where` argument doesn't exist, create a new Music with this data.
     */
    create: XOR<MusicCreateInput, MusicUncheckedCreateInput>
    /**
     * In case the Music was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MusicUpdateInput, MusicUncheckedUpdateInput>
  }

  /**
   * Music delete
   */
  export type MusicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicInclude<ExtArgs> | null
    /**
     * Filter which Music to delete.
     */
    where: MusicWhereUniqueInput
  }

  /**
   * Music deleteMany
   */
  export type MusicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Music to delete
     */
    where?: MusicWhereInput
  }

  /**
   * Music.tags
   */
  export type Music$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    where?: MusicTagWhereInput
    orderBy?: MusicTagOrderByWithRelationInput | MusicTagOrderByWithRelationInput[]
    cursor?: MusicTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MusicTagScalarFieldEnum | MusicTagScalarFieldEnum[]
  }

  /**
   * Music without action
   */
  export type MusicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Music
     */
    select?: MusicSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagAvgAggregateOutputType = {
    id: number | null
  }

  export type TagSumAggregateOutputType = {
    id: number | null
  }

  export type TagMinAggregateOutputType = {
    id: number | null
    name: string | null
    color: string | null
    createdAt: Date | null
  }

  export type TagMaxAggregateOutputType = {
    id: number | null
    name: string | null
    color: string | null
    createdAt: Date | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    name: number
    color: number
    createdAt: number
    _all: number
  }


  export type TagAvgAggregateInputType = {
    id?: true
  }

  export type TagSumAggregateInputType = {
    id?: true
  }

  export type TagMinAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdAt?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdAt?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    name?: true
    color?: true
    createdAt?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _avg?: TagAvgAggregateInputType
    _sum?: TagSumAggregateInputType
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: number
    name: string
    color: string
    createdAt: Date
    _count: TagCountAggregateOutputType | null
    _avg: TagAvgAggregateOutputType | null
    _sum: TagSumAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
    books?: boolean | Tag$booksArgs<ExtArgs>
    animes?: boolean | Tag$animesArgs<ExtArgs>
    musics?: boolean | Tag$musicsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    name?: boolean
    color?: boolean
    createdAt?: boolean
  }

  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    books?: boolean | Tag$booksArgs<ExtArgs>
    animes?: boolean | Tag$animesArgs<ExtArgs>
    musics?: boolean | Tag$musicsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      books: Prisma.$BookTagPayload<ExtArgs>[]
      animes: Prisma.$AnimeTagPayload<ExtArgs>[]
      musics: Prisma.$MusicTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      color: string
      createdAt: Date
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    books<T extends Tag$booksArgs<ExtArgs> = {}>(args?: Subset<T, Tag$booksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "findMany"> | Null>
    animes<T extends Tag$animesArgs<ExtArgs> = {}>(args?: Subset<T, Tag$animesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "findMany"> | Null>
    musics<T extends Tag$musicsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$musicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */ 
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'Int'>
    readonly name: FieldRef<"Tag", 'String'>
    readonly color: FieldRef<"Tag", 'String'>
    readonly createdAt: FieldRef<"Tag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
  }

  /**
   * Tag.books
   */
  export type Tag$booksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    where?: BookTagWhereInput
    orderBy?: BookTagOrderByWithRelationInput | BookTagOrderByWithRelationInput[]
    cursor?: BookTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BookTagScalarFieldEnum | BookTagScalarFieldEnum[]
  }

  /**
   * Tag.animes
   */
  export type Tag$animesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    where?: AnimeTagWhereInput
    orderBy?: AnimeTagOrderByWithRelationInput | AnimeTagOrderByWithRelationInput[]
    cursor?: AnimeTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AnimeTagScalarFieldEnum | AnimeTagScalarFieldEnum[]
  }

  /**
   * Tag.musics
   */
  export type Tag$musicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    where?: MusicTagWhereInput
    orderBy?: MusicTagOrderByWithRelationInput | MusicTagOrderByWithRelationInput[]
    cursor?: MusicTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MusicTagScalarFieldEnum | MusicTagScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model MusicTag
   */

  export type AggregateMusicTag = {
    _count: MusicTagCountAggregateOutputType | null
    _avg: MusicTagAvgAggregateOutputType | null
    _sum: MusicTagSumAggregateOutputType | null
    _min: MusicTagMinAggregateOutputType | null
    _max: MusicTagMaxAggregateOutputType | null
  }

  export type MusicTagAvgAggregateOutputType = {
    musicId: number | null
    tagId: number | null
  }

  export type MusicTagSumAggregateOutputType = {
    musicId: number | null
    tagId: number | null
  }

  export type MusicTagMinAggregateOutputType = {
    musicId: number | null
    tagId: number | null
  }

  export type MusicTagMaxAggregateOutputType = {
    musicId: number | null
    tagId: number | null
  }

  export type MusicTagCountAggregateOutputType = {
    musicId: number
    tagId: number
    _all: number
  }


  export type MusicTagAvgAggregateInputType = {
    musicId?: true
    tagId?: true
  }

  export type MusicTagSumAggregateInputType = {
    musicId?: true
    tagId?: true
  }

  export type MusicTagMinAggregateInputType = {
    musicId?: true
    tagId?: true
  }

  export type MusicTagMaxAggregateInputType = {
    musicId?: true
    tagId?: true
  }

  export type MusicTagCountAggregateInputType = {
    musicId?: true
    tagId?: true
    _all?: true
  }

  export type MusicTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MusicTag to aggregate.
     */
    where?: MusicTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicTags to fetch.
     */
    orderBy?: MusicTagOrderByWithRelationInput | MusicTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MusicTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MusicTags
    **/
    _count?: true | MusicTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MusicTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MusicTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MusicTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MusicTagMaxAggregateInputType
  }

  export type GetMusicTagAggregateType<T extends MusicTagAggregateArgs> = {
        [P in keyof T & keyof AggregateMusicTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMusicTag[P]>
      : GetScalarType<T[P], AggregateMusicTag[P]>
  }




  export type MusicTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MusicTagWhereInput
    orderBy?: MusicTagOrderByWithAggregationInput | MusicTagOrderByWithAggregationInput[]
    by: MusicTagScalarFieldEnum[] | MusicTagScalarFieldEnum
    having?: MusicTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MusicTagCountAggregateInputType | true
    _avg?: MusicTagAvgAggregateInputType
    _sum?: MusicTagSumAggregateInputType
    _min?: MusicTagMinAggregateInputType
    _max?: MusicTagMaxAggregateInputType
  }

  export type MusicTagGroupByOutputType = {
    musicId: number
    tagId: number
    _count: MusicTagCountAggregateOutputType | null
    _avg: MusicTagAvgAggregateOutputType | null
    _sum: MusicTagSumAggregateOutputType | null
    _min: MusicTagMinAggregateOutputType | null
    _max: MusicTagMaxAggregateOutputType | null
  }

  type GetMusicTagGroupByPayload<T extends MusicTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MusicTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MusicTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MusicTagGroupByOutputType[P]>
            : GetScalarType<T[P], MusicTagGroupByOutputType[P]>
        }
      >
    >


  export type MusicTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    musicId?: boolean
    tagId?: boolean
    music?: boolean | MusicDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["musicTag"]>

  export type MusicTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    musicId?: boolean
    tagId?: boolean
    music?: boolean | MusicDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["musicTag"]>

  export type MusicTagSelectScalar = {
    musicId?: boolean
    tagId?: boolean
  }

  export type MusicTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    music?: boolean | MusicDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type MusicTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    music?: boolean | MusicDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $MusicTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MusicTag"
    objects: {
      music: Prisma.$MusicPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      musicId: number
      tagId: number
    }, ExtArgs["result"]["musicTag"]>
    composites: {}
  }

  type MusicTagGetPayload<S extends boolean | null | undefined | MusicTagDefaultArgs> = $Result.GetResult<Prisma.$MusicTagPayload, S>

  type MusicTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MusicTagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MusicTagCountAggregateInputType | true
    }

  export interface MusicTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MusicTag'], meta: { name: 'MusicTag' } }
    /**
     * Find zero or one MusicTag that matches the filter.
     * @param {MusicTagFindUniqueArgs} args - Arguments to find a MusicTag
     * @example
     * // Get one MusicTag
     * const musicTag = await prisma.musicTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MusicTagFindUniqueArgs>(args: SelectSubset<T, MusicTagFindUniqueArgs<ExtArgs>>): Prisma__MusicTagClient<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MusicTag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MusicTagFindUniqueOrThrowArgs} args - Arguments to find a MusicTag
     * @example
     * // Get one MusicTag
     * const musicTag = await prisma.musicTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MusicTagFindUniqueOrThrowArgs>(args: SelectSubset<T, MusicTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MusicTagClient<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MusicTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicTagFindFirstArgs} args - Arguments to find a MusicTag
     * @example
     * // Get one MusicTag
     * const musicTag = await prisma.musicTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MusicTagFindFirstArgs>(args?: SelectSubset<T, MusicTagFindFirstArgs<ExtArgs>>): Prisma__MusicTagClient<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MusicTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicTagFindFirstOrThrowArgs} args - Arguments to find a MusicTag
     * @example
     * // Get one MusicTag
     * const musicTag = await prisma.musicTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MusicTagFindFirstOrThrowArgs>(args?: SelectSubset<T, MusicTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__MusicTagClient<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MusicTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MusicTags
     * const musicTags = await prisma.musicTag.findMany()
     * 
     * // Get first 10 MusicTags
     * const musicTags = await prisma.musicTag.findMany({ take: 10 })
     * 
     * // Only select the `musicId`
     * const musicTagWithMusicIdOnly = await prisma.musicTag.findMany({ select: { musicId: true } })
     * 
     */
    findMany<T extends MusicTagFindManyArgs>(args?: SelectSubset<T, MusicTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MusicTag.
     * @param {MusicTagCreateArgs} args - Arguments to create a MusicTag.
     * @example
     * // Create one MusicTag
     * const MusicTag = await prisma.musicTag.create({
     *   data: {
     *     // ... data to create a MusicTag
     *   }
     * })
     * 
     */
    create<T extends MusicTagCreateArgs>(args: SelectSubset<T, MusicTagCreateArgs<ExtArgs>>): Prisma__MusicTagClient<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MusicTags.
     * @param {MusicTagCreateManyArgs} args - Arguments to create many MusicTags.
     * @example
     * // Create many MusicTags
     * const musicTag = await prisma.musicTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MusicTagCreateManyArgs>(args?: SelectSubset<T, MusicTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MusicTags and returns the data saved in the database.
     * @param {MusicTagCreateManyAndReturnArgs} args - Arguments to create many MusicTags.
     * @example
     * // Create many MusicTags
     * const musicTag = await prisma.musicTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MusicTags and only return the `musicId`
     * const musicTagWithMusicIdOnly = await prisma.musicTag.createManyAndReturn({ 
     *   select: { musicId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MusicTagCreateManyAndReturnArgs>(args?: SelectSubset<T, MusicTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MusicTag.
     * @param {MusicTagDeleteArgs} args - Arguments to delete one MusicTag.
     * @example
     * // Delete one MusicTag
     * const MusicTag = await prisma.musicTag.delete({
     *   where: {
     *     // ... filter to delete one MusicTag
     *   }
     * })
     * 
     */
    delete<T extends MusicTagDeleteArgs>(args: SelectSubset<T, MusicTagDeleteArgs<ExtArgs>>): Prisma__MusicTagClient<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MusicTag.
     * @param {MusicTagUpdateArgs} args - Arguments to update one MusicTag.
     * @example
     * // Update one MusicTag
     * const musicTag = await prisma.musicTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MusicTagUpdateArgs>(args: SelectSubset<T, MusicTagUpdateArgs<ExtArgs>>): Prisma__MusicTagClient<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MusicTags.
     * @param {MusicTagDeleteManyArgs} args - Arguments to filter MusicTags to delete.
     * @example
     * // Delete a few MusicTags
     * const { count } = await prisma.musicTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MusicTagDeleteManyArgs>(args?: SelectSubset<T, MusicTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MusicTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MusicTags
     * const musicTag = await prisma.musicTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MusicTagUpdateManyArgs>(args: SelectSubset<T, MusicTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MusicTag.
     * @param {MusicTagUpsertArgs} args - Arguments to update or create a MusicTag.
     * @example
     * // Update or create a MusicTag
     * const musicTag = await prisma.musicTag.upsert({
     *   create: {
     *     // ... data to create a MusicTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MusicTag we want to update
     *   }
     * })
     */
    upsert<T extends MusicTagUpsertArgs>(args: SelectSubset<T, MusicTagUpsertArgs<ExtArgs>>): Prisma__MusicTagClient<$Result.GetResult<Prisma.$MusicTagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MusicTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicTagCountArgs} args - Arguments to filter MusicTags to count.
     * @example
     * // Count the number of MusicTags
     * const count = await prisma.musicTag.count({
     *   where: {
     *     // ... the filter for the MusicTags we want to count
     *   }
     * })
    **/
    count<T extends MusicTagCountArgs>(
      args?: Subset<T, MusicTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MusicTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MusicTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MusicTagAggregateArgs>(args: Subset<T, MusicTagAggregateArgs>): Prisma.PrismaPromise<GetMusicTagAggregateType<T>>

    /**
     * Group by MusicTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MusicTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MusicTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MusicTagGroupByArgs['orderBy'] }
        : { orderBy?: MusicTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MusicTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMusicTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MusicTag model
   */
  readonly fields: MusicTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MusicTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MusicTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    music<T extends MusicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MusicDefaultArgs<ExtArgs>>): Prisma__MusicClient<$Result.GetResult<Prisma.$MusicPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MusicTag model
   */ 
  interface MusicTagFieldRefs {
    readonly musicId: FieldRef<"MusicTag", 'Int'>
    readonly tagId: FieldRef<"MusicTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * MusicTag findUnique
   */
  export type MusicTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    /**
     * Filter, which MusicTag to fetch.
     */
    where: MusicTagWhereUniqueInput
  }

  /**
   * MusicTag findUniqueOrThrow
   */
  export type MusicTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    /**
     * Filter, which MusicTag to fetch.
     */
    where: MusicTagWhereUniqueInput
  }

  /**
   * MusicTag findFirst
   */
  export type MusicTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    /**
     * Filter, which MusicTag to fetch.
     */
    where?: MusicTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicTags to fetch.
     */
    orderBy?: MusicTagOrderByWithRelationInput | MusicTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MusicTags.
     */
    cursor?: MusicTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MusicTags.
     */
    distinct?: MusicTagScalarFieldEnum | MusicTagScalarFieldEnum[]
  }

  /**
   * MusicTag findFirstOrThrow
   */
  export type MusicTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    /**
     * Filter, which MusicTag to fetch.
     */
    where?: MusicTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicTags to fetch.
     */
    orderBy?: MusicTagOrderByWithRelationInput | MusicTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MusicTags.
     */
    cursor?: MusicTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MusicTags.
     */
    distinct?: MusicTagScalarFieldEnum | MusicTagScalarFieldEnum[]
  }

  /**
   * MusicTag findMany
   */
  export type MusicTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    /**
     * Filter, which MusicTags to fetch.
     */
    where?: MusicTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MusicTags to fetch.
     */
    orderBy?: MusicTagOrderByWithRelationInput | MusicTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MusicTags.
     */
    cursor?: MusicTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MusicTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MusicTags.
     */
    skip?: number
    distinct?: MusicTagScalarFieldEnum | MusicTagScalarFieldEnum[]
  }

  /**
   * MusicTag create
   */
  export type MusicTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    /**
     * The data needed to create a MusicTag.
     */
    data: XOR<MusicTagCreateInput, MusicTagUncheckedCreateInput>
  }

  /**
   * MusicTag createMany
   */
  export type MusicTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MusicTags.
     */
    data: MusicTagCreateManyInput | MusicTagCreateManyInput[]
  }

  /**
   * MusicTag createManyAndReturn
   */
  export type MusicTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MusicTags.
     */
    data: MusicTagCreateManyInput | MusicTagCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MusicTag update
   */
  export type MusicTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    /**
     * The data needed to update a MusicTag.
     */
    data: XOR<MusicTagUpdateInput, MusicTagUncheckedUpdateInput>
    /**
     * Choose, which MusicTag to update.
     */
    where: MusicTagWhereUniqueInput
  }

  /**
   * MusicTag updateMany
   */
  export type MusicTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MusicTags.
     */
    data: XOR<MusicTagUpdateManyMutationInput, MusicTagUncheckedUpdateManyInput>
    /**
     * Filter which MusicTags to update
     */
    where?: MusicTagWhereInput
  }

  /**
   * MusicTag upsert
   */
  export type MusicTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    /**
     * The filter to search for the MusicTag to update in case it exists.
     */
    where: MusicTagWhereUniqueInput
    /**
     * In case the MusicTag found by the `where` argument doesn't exist, create a new MusicTag with this data.
     */
    create: XOR<MusicTagCreateInput, MusicTagUncheckedCreateInput>
    /**
     * In case the MusicTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MusicTagUpdateInput, MusicTagUncheckedUpdateInput>
  }

  /**
   * MusicTag delete
   */
  export type MusicTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
    /**
     * Filter which MusicTag to delete.
     */
    where: MusicTagWhereUniqueInput
  }

  /**
   * MusicTag deleteMany
   */
  export type MusicTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MusicTags to delete
     */
    where?: MusicTagWhereInput
  }

  /**
   * MusicTag without action
   */
  export type MusicTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MusicTag
     */
    select?: MusicTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MusicTagInclude<ExtArgs> | null
  }


  /**
   * Model BookTag
   */

  export type AggregateBookTag = {
    _count: BookTagCountAggregateOutputType | null
    _avg: BookTagAvgAggregateOutputType | null
    _sum: BookTagSumAggregateOutputType | null
    _min: BookTagMinAggregateOutputType | null
    _max: BookTagMaxAggregateOutputType | null
  }

  export type BookTagAvgAggregateOutputType = {
    bookId: number | null
    tagId: number | null
  }

  export type BookTagSumAggregateOutputType = {
    bookId: number | null
    tagId: number | null
  }

  export type BookTagMinAggregateOutputType = {
    bookId: number | null
    tagId: number | null
  }

  export type BookTagMaxAggregateOutputType = {
    bookId: number | null
    tagId: number | null
  }

  export type BookTagCountAggregateOutputType = {
    bookId: number
    tagId: number
    _all: number
  }


  export type BookTagAvgAggregateInputType = {
    bookId?: true
    tagId?: true
  }

  export type BookTagSumAggregateInputType = {
    bookId?: true
    tagId?: true
  }

  export type BookTagMinAggregateInputType = {
    bookId?: true
    tagId?: true
  }

  export type BookTagMaxAggregateInputType = {
    bookId?: true
    tagId?: true
  }

  export type BookTagCountAggregateInputType = {
    bookId?: true
    tagId?: true
    _all?: true
  }

  export type BookTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookTag to aggregate.
     */
    where?: BookTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTags to fetch.
     */
    orderBy?: BookTagOrderByWithRelationInput | BookTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BookTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BookTags
    **/
    _count?: true | BookTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BookTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BookTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BookTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BookTagMaxAggregateInputType
  }

  export type GetBookTagAggregateType<T extends BookTagAggregateArgs> = {
        [P in keyof T & keyof AggregateBookTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBookTag[P]>
      : GetScalarType<T[P], AggregateBookTag[P]>
  }




  export type BookTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BookTagWhereInput
    orderBy?: BookTagOrderByWithAggregationInput | BookTagOrderByWithAggregationInput[]
    by: BookTagScalarFieldEnum[] | BookTagScalarFieldEnum
    having?: BookTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BookTagCountAggregateInputType | true
    _avg?: BookTagAvgAggregateInputType
    _sum?: BookTagSumAggregateInputType
    _min?: BookTagMinAggregateInputType
    _max?: BookTagMaxAggregateInputType
  }

  export type BookTagGroupByOutputType = {
    bookId: number
    tagId: number
    _count: BookTagCountAggregateOutputType | null
    _avg: BookTagAvgAggregateOutputType | null
    _sum: BookTagSumAggregateOutputType | null
    _min: BookTagMinAggregateOutputType | null
    _max: BookTagMaxAggregateOutputType | null
  }

  type GetBookTagGroupByPayload<T extends BookTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BookTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BookTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BookTagGroupByOutputType[P]>
            : GetScalarType<T[P], BookTagGroupByOutputType[P]>
        }
      >
    >


  export type BookTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookId?: boolean
    tagId?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookTag"]>

  export type BookTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bookId?: boolean
    tagId?: boolean
    book?: boolean | BookDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bookTag"]>

  export type BookTagSelectScalar = {
    bookId?: boolean
    tagId?: boolean
  }

  export type BookTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type BookTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    book?: boolean | BookDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $BookTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BookTag"
    objects: {
      book: Prisma.$BookPayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      bookId: number
      tagId: number
    }, ExtArgs["result"]["bookTag"]>
    composites: {}
  }

  type BookTagGetPayload<S extends boolean | null | undefined | BookTagDefaultArgs> = $Result.GetResult<Prisma.$BookTagPayload, S>

  type BookTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BookTagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BookTagCountAggregateInputType | true
    }

  export interface BookTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BookTag'], meta: { name: 'BookTag' } }
    /**
     * Find zero or one BookTag that matches the filter.
     * @param {BookTagFindUniqueArgs} args - Arguments to find a BookTag
     * @example
     * // Get one BookTag
     * const bookTag = await prisma.bookTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookTagFindUniqueArgs>(args: SelectSubset<T, BookTagFindUniqueArgs<ExtArgs>>): Prisma__BookTagClient<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BookTag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BookTagFindUniqueOrThrowArgs} args - Arguments to find a BookTag
     * @example
     * // Get one BookTag
     * const bookTag = await prisma.bookTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookTagFindUniqueOrThrowArgs>(args: SelectSubset<T, BookTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BookTagClient<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BookTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTagFindFirstArgs} args - Arguments to find a BookTag
     * @example
     * // Get one BookTag
     * const bookTag = await prisma.bookTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookTagFindFirstArgs>(args?: SelectSubset<T, BookTagFindFirstArgs<ExtArgs>>): Prisma__BookTagClient<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BookTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTagFindFirstOrThrowArgs} args - Arguments to find a BookTag
     * @example
     * // Get one BookTag
     * const bookTag = await prisma.bookTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookTagFindFirstOrThrowArgs>(args?: SelectSubset<T, BookTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__BookTagClient<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BookTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BookTags
     * const bookTags = await prisma.bookTag.findMany()
     * 
     * // Get first 10 BookTags
     * const bookTags = await prisma.bookTag.findMany({ take: 10 })
     * 
     * // Only select the `bookId`
     * const bookTagWithBookIdOnly = await prisma.bookTag.findMany({ select: { bookId: true } })
     * 
     */
    findMany<T extends BookTagFindManyArgs>(args?: SelectSubset<T, BookTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BookTag.
     * @param {BookTagCreateArgs} args - Arguments to create a BookTag.
     * @example
     * // Create one BookTag
     * const BookTag = await prisma.bookTag.create({
     *   data: {
     *     // ... data to create a BookTag
     *   }
     * })
     * 
     */
    create<T extends BookTagCreateArgs>(args: SelectSubset<T, BookTagCreateArgs<ExtArgs>>): Prisma__BookTagClient<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BookTags.
     * @param {BookTagCreateManyArgs} args - Arguments to create many BookTags.
     * @example
     * // Create many BookTags
     * const bookTag = await prisma.bookTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BookTagCreateManyArgs>(args?: SelectSubset<T, BookTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BookTags and returns the data saved in the database.
     * @param {BookTagCreateManyAndReturnArgs} args - Arguments to create many BookTags.
     * @example
     * // Create many BookTags
     * const bookTag = await prisma.bookTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BookTags and only return the `bookId`
     * const bookTagWithBookIdOnly = await prisma.bookTag.createManyAndReturn({ 
     *   select: { bookId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BookTagCreateManyAndReturnArgs>(args?: SelectSubset<T, BookTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BookTag.
     * @param {BookTagDeleteArgs} args - Arguments to delete one BookTag.
     * @example
     * // Delete one BookTag
     * const BookTag = await prisma.bookTag.delete({
     *   where: {
     *     // ... filter to delete one BookTag
     *   }
     * })
     * 
     */
    delete<T extends BookTagDeleteArgs>(args: SelectSubset<T, BookTagDeleteArgs<ExtArgs>>): Prisma__BookTagClient<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BookTag.
     * @param {BookTagUpdateArgs} args - Arguments to update one BookTag.
     * @example
     * // Update one BookTag
     * const bookTag = await prisma.bookTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BookTagUpdateArgs>(args: SelectSubset<T, BookTagUpdateArgs<ExtArgs>>): Prisma__BookTagClient<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BookTags.
     * @param {BookTagDeleteManyArgs} args - Arguments to filter BookTags to delete.
     * @example
     * // Delete a few BookTags
     * const { count } = await prisma.bookTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BookTagDeleteManyArgs>(args?: SelectSubset<T, BookTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BookTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BookTags
     * const bookTag = await prisma.bookTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BookTagUpdateManyArgs>(args: SelectSubset<T, BookTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BookTag.
     * @param {BookTagUpsertArgs} args - Arguments to update or create a BookTag.
     * @example
     * // Update or create a BookTag
     * const bookTag = await prisma.bookTag.upsert({
     *   create: {
     *     // ... data to create a BookTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BookTag we want to update
     *   }
     * })
     */
    upsert<T extends BookTagUpsertArgs>(args: SelectSubset<T, BookTagUpsertArgs<ExtArgs>>): Prisma__BookTagClient<$Result.GetResult<Prisma.$BookTagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BookTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTagCountArgs} args - Arguments to filter BookTags to count.
     * @example
     * // Count the number of BookTags
     * const count = await prisma.bookTag.count({
     *   where: {
     *     // ... the filter for the BookTags we want to count
     *   }
     * })
    **/
    count<T extends BookTagCountArgs>(
      args?: Subset<T, BookTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BookTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BookTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BookTagAggregateArgs>(args: Subset<T, BookTagAggregateArgs>): Prisma.PrismaPromise<GetBookTagAggregateType<T>>

    /**
     * Group by BookTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BookTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BookTagGroupByArgs['orderBy'] }
        : { orderBy?: BookTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BookTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BookTag model
   */
  readonly fields: BookTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BookTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BookTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    book<T extends BookDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BookDefaultArgs<ExtArgs>>): Prisma__BookClient<$Result.GetResult<Prisma.$BookPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BookTag model
   */ 
  interface BookTagFieldRefs {
    readonly bookId: FieldRef<"BookTag", 'Int'>
    readonly tagId: FieldRef<"BookTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BookTag findUnique
   */
  export type BookTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    /**
     * Filter, which BookTag to fetch.
     */
    where: BookTagWhereUniqueInput
  }

  /**
   * BookTag findUniqueOrThrow
   */
  export type BookTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    /**
     * Filter, which BookTag to fetch.
     */
    where: BookTagWhereUniqueInput
  }

  /**
   * BookTag findFirst
   */
  export type BookTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    /**
     * Filter, which BookTag to fetch.
     */
    where?: BookTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTags to fetch.
     */
    orderBy?: BookTagOrderByWithRelationInput | BookTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookTags.
     */
    cursor?: BookTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookTags.
     */
    distinct?: BookTagScalarFieldEnum | BookTagScalarFieldEnum[]
  }

  /**
   * BookTag findFirstOrThrow
   */
  export type BookTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    /**
     * Filter, which BookTag to fetch.
     */
    where?: BookTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTags to fetch.
     */
    orderBy?: BookTagOrderByWithRelationInput | BookTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BookTags.
     */
    cursor?: BookTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BookTags.
     */
    distinct?: BookTagScalarFieldEnum | BookTagScalarFieldEnum[]
  }

  /**
   * BookTag findMany
   */
  export type BookTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    /**
     * Filter, which BookTags to fetch.
     */
    where?: BookTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BookTags to fetch.
     */
    orderBy?: BookTagOrderByWithRelationInput | BookTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BookTags.
     */
    cursor?: BookTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BookTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BookTags.
     */
    skip?: number
    distinct?: BookTagScalarFieldEnum | BookTagScalarFieldEnum[]
  }

  /**
   * BookTag create
   */
  export type BookTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    /**
     * The data needed to create a BookTag.
     */
    data: XOR<BookTagCreateInput, BookTagUncheckedCreateInput>
  }

  /**
   * BookTag createMany
   */
  export type BookTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BookTags.
     */
    data: BookTagCreateManyInput | BookTagCreateManyInput[]
  }

  /**
   * BookTag createManyAndReturn
   */
  export type BookTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BookTags.
     */
    data: BookTagCreateManyInput | BookTagCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BookTag update
   */
  export type BookTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    /**
     * The data needed to update a BookTag.
     */
    data: XOR<BookTagUpdateInput, BookTagUncheckedUpdateInput>
    /**
     * Choose, which BookTag to update.
     */
    where: BookTagWhereUniqueInput
  }

  /**
   * BookTag updateMany
   */
  export type BookTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BookTags.
     */
    data: XOR<BookTagUpdateManyMutationInput, BookTagUncheckedUpdateManyInput>
    /**
     * Filter which BookTags to update
     */
    where?: BookTagWhereInput
  }

  /**
   * BookTag upsert
   */
  export type BookTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    /**
     * The filter to search for the BookTag to update in case it exists.
     */
    where: BookTagWhereUniqueInput
    /**
     * In case the BookTag found by the `where` argument doesn't exist, create a new BookTag with this data.
     */
    create: XOR<BookTagCreateInput, BookTagUncheckedCreateInput>
    /**
     * In case the BookTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BookTagUpdateInput, BookTagUncheckedUpdateInput>
  }

  /**
   * BookTag delete
   */
  export type BookTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
    /**
     * Filter which BookTag to delete.
     */
    where: BookTagWhereUniqueInput
  }

  /**
   * BookTag deleteMany
   */
  export type BookTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BookTags to delete
     */
    where?: BookTagWhereInput
  }

  /**
   * BookTag without action
   */
  export type BookTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookTag
     */
    select?: BookTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BookTagInclude<ExtArgs> | null
  }


  /**
   * Model AnimeTag
   */

  export type AggregateAnimeTag = {
    _count: AnimeTagCountAggregateOutputType | null
    _avg: AnimeTagAvgAggregateOutputType | null
    _sum: AnimeTagSumAggregateOutputType | null
    _min: AnimeTagMinAggregateOutputType | null
    _max: AnimeTagMaxAggregateOutputType | null
  }

  export type AnimeTagAvgAggregateOutputType = {
    animeId: number | null
    tagId: number | null
  }

  export type AnimeTagSumAggregateOutputType = {
    animeId: number | null
    tagId: number | null
  }

  export type AnimeTagMinAggregateOutputType = {
    animeId: number | null
    tagId: number | null
  }

  export type AnimeTagMaxAggregateOutputType = {
    animeId: number | null
    tagId: number | null
  }

  export type AnimeTagCountAggregateOutputType = {
    animeId: number
    tagId: number
    _all: number
  }


  export type AnimeTagAvgAggregateInputType = {
    animeId?: true
    tagId?: true
  }

  export type AnimeTagSumAggregateInputType = {
    animeId?: true
    tagId?: true
  }

  export type AnimeTagMinAggregateInputType = {
    animeId?: true
    tagId?: true
  }

  export type AnimeTagMaxAggregateInputType = {
    animeId?: true
    tagId?: true
  }

  export type AnimeTagCountAggregateInputType = {
    animeId?: true
    tagId?: true
    _all?: true
  }

  export type AnimeTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnimeTag to aggregate.
     */
    where?: AnimeTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnimeTags to fetch.
     */
    orderBy?: AnimeTagOrderByWithRelationInput | AnimeTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnimeTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnimeTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnimeTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnimeTags
    **/
    _count?: true | AnimeTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnimeTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnimeTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnimeTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnimeTagMaxAggregateInputType
  }

  export type GetAnimeTagAggregateType<T extends AnimeTagAggregateArgs> = {
        [P in keyof T & keyof AggregateAnimeTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnimeTag[P]>
      : GetScalarType<T[P], AggregateAnimeTag[P]>
  }




  export type AnimeTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnimeTagWhereInput
    orderBy?: AnimeTagOrderByWithAggregationInput | AnimeTagOrderByWithAggregationInput[]
    by: AnimeTagScalarFieldEnum[] | AnimeTagScalarFieldEnum
    having?: AnimeTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnimeTagCountAggregateInputType | true
    _avg?: AnimeTagAvgAggregateInputType
    _sum?: AnimeTagSumAggregateInputType
    _min?: AnimeTagMinAggregateInputType
    _max?: AnimeTagMaxAggregateInputType
  }

  export type AnimeTagGroupByOutputType = {
    animeId: number
    tagId: number
    _count: AnimeTagCountAggregateOutputType | null
    _avg: AnimeTagAvgAggregateOutputType | null
    _sum: AnimeTagSumAggregateOutputType | null
    _min: AnimeTagMinAggregateOutputType | null
    _max: AnimeTagMaxAggregateOutputType | null
  }

  type GetAnimeTagGroupByPayload<T extends AnimeTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnimeTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnimeTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnimeTagGroupByOutputType[P]>
            : GetScalarType<T[P], AnimeTagGroupByOutputType[P]>
        }
      >
    >


  export type AnimeTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    animeId?: boolean
    tagId?: boolean
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animeTag"]>

  export type AnimeTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    animeId?: boolean
    tagId?: boolean
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["animeTag"]>

  export type AnimeTagSelectScalar = {
    animeId?: boolean
    tagId?: boolean
  }

  export type AnimeTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }
  export type AnimeTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    anime?: boolean | AnimeDefaultArgs<ExtArgs>
    tag?: boolean | TagDefaultArgs<ExtArgs>
  }

  export type $AnimeTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnimeTag"
    objects: {
      anime: Prisma.$AnimePayload<ExtArgs>
      tag: Prisma.$TagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      animeId: number
      tagId: number
    }, ExtArgs["result"]["animeTag"]>
    composites: {}
  }

  type AnimeTagGetPayload<S extends boolean | null | undefined | AnimeTagDefaultArgs> = $Result.GetResult<Prisma.$AnimeTagPayload, S>

  type AnimeTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AnimeTagFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AnimeTagCountAggregateInputType | true
    }

  export interface AnimeTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnimeTag'], meta: { name: 'AnimeTag' } }
    /**
     * Find zero or one AnimeTag that matches the filter.
     * @param {AnimeTagFindUniqueArgs} args - Arguments to find a AnimeTag
     * @example
     * // Get one AnimeTag
     * const animeTag = await prisma.animeTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnimeTagFindUniqueArgs>(args: SelectSubset<T, AnimeTagFindUniqueArgs<ExtArgs>>): Prisma__AnimeTagClient<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AnimeTag that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AnimeTagFindUniqueOrThrowArgs} args - Arguments to find a AnimeTag
     * @example
     * // Get one AnimeTag
     * const animeTag = await prisma.animeTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnimeTagFindUniqueOrThrowArgs>(args: SelectSubset<T, AnimeTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnimeTagClient<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AnimeTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeTagFindFirstArgs} args - Arguments to find a AnimeTag
     * @example
     * // Get one AnimeTag
     * const animeTag = await prisma.animeTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnimeTagFindFirstArgs>(args?: SelectSubset<T, AnimeTagFindFirstArgs<ExtArgs>>): Prisma__AnimeTagClient<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AnimeTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeTagFindFirstOrThrowArgs} args - Arguments to find a AnimeTag
     * @example
     * // Get one AnimeTag
     * const animeTag = await prisma.animeTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnimeTagFindFirstOrThrowArgs>(args?: SelectSubset<T, AnimeTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnimeTagClient<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AnimeTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnimeTags
     * const animeTags = await prisma.animeTag.findMany()
     * 
     * // Get first 10 AnimeTags
     * const animeTags = await prisma.animeTag.findMany({ take: 10 })
     * 
     * // Only select the `animeId`
     * const animeTagWithAnimeIdOnly = await prisma.animeTag.findMany({ select: { animeId: true } })
     * 
     */
    findMany<T extends AnimeTagFindManyArgs>(args?: SelectSubset<T, AnimeTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AnimeTag.
     * @param {AnimeTagCreateArgs} args - Arguments to create a AnimeTag.
     * @example
     * // Create one AnimeTag
     * const AnimeTag = await prisma.animeTag.create({
     *   data: {
     *     // ... data to create a AnimeTag
     *   }
     * })
     * 
     */
    create<T extends AnimeTagCreateArgs>(args: SelectSubset<T, AnimeTagCreateArgs<ExtArgs>>): Prisma__AnimeTagClient<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AnimeTags.
     * @param {AnimeTagCreateManyArgs} args - Arguments to create many AnimeTags.
     * @example
     * // Create many AnimeTags
     * const animeTag = await prisma.animeTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnimeTagCreateManyArgs>(args?: SelectSubset<T, AnimeTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnimeTags and returns the data saved in the database.
     * @param {AnimeTagCreateManyAndReturnArgs} args - Arguments to create many AnimeTags.
     * @example
     * // Create many AnimeTags
     * const animeTag = await prisma.animeTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnimeTags and only return the `animeId`
     * const animeTagWithAnimeIdOnly = await prisma.animeTag.createManyAndReturn({ 
     *   select: { animeId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnimeTagCreateManyAndReturnArgs>(args?: SelectSubset<T, AnimeTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AnimeTag.
     * @param {AnimeTagDeleteArgs} args - Arguments to delete one AnimeTag.
     * @example
     * // Delete one AnimeTag
     * const AnimeTag = await prisma.animeTag.delete({
     *   where: {
     *     // ... filter to delete one AnimeTag
     *   }
     * })
     * 
     */
    delete<T extends AnimeTagDeleteArgs>(args: SelectSubset<T, AnimeTagDeleteArgs<ExtArgs>>): Prisma__AnimeTagClient<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AnimeTag.
     * @param {AnimeTagUpdateArgs} args - Arguments to update one AnimeTag.
     * @example
     * // Update one AnimeTag
     * const animeTag = await prisma.animeTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnimeTagUpdateArgs>(args: SelectSubset<T, AnimeTagUpdateArgs<ExtArgs>>): Prisma__AnimeTagClient<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AnimeTags.
     * @param {AnimeTagDeleteManyArgs} args - Arguments to filter AnimeTags to delete.
     * @example
     * // Delete a few AnimeTags
     * const { count } = await prisma.animeTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnimeTagDeleteManyArgs>(args?: SelectSubset<T, AnimeTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnimeTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnimeTags
     * const animeTag = await prisma.animeTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnimeTagUpdateManyArgs>(args: SelectSubset<T, AnimeTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AnimeTag.
     * @param {AnimeTagUpsertArgs} args - Arguments to update or create a AnimeTag.
     * @example
     * // Update or create a AnimeTag
     * const animeTag = await prisma.animeTag.upsert({
     *   create: {
     *     // ... data to create a AnimeTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnimeTag we want to update
     *   }
     * })
     */
    upsert<T extends AnimeTagUpsertArgs>(args: SelectSubset<T, AnimeTagUpsertArgs<ExtArgs>>): Prisma__AnimeTagClient<$Result.GetResult<Prisma.$AnimeTagPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AnimeTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeTagCountArgs} args - Arguments to filter AnimeTags to count.
     * @example
     * // Count the number of AnimeTags
     * const count = await prisma.animeTag.count({
     *   where: {
     *     // ... the filter for the AnimeTags we want to count
     *   }
     * })
    **/
    count<T extends AnimeTagCountArgs>(
      args?: Subset<T, AnimeTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnimeTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnimeTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnimeTagAggregateArgs>(args: Subset<T, AnimeTagAggregateArgs>): Prisma.PrismaPromise<GetAnimeTagAggregateType<T>>

    /**
     * Group by AnimeTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnimeTagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnimeTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnimeTagGroupByArgs['orderBy'] }
        : { orderBy?: AnimeTagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnimeTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnimeTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnimeTag model
   */
  readonly fields: AnimeTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnimeTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnimeTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    anime<T extends AnimeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AnimeDefaultArgs<ExtArgs>>): Prisma__AnimeClient<$Result.GetResult<Prisma.$AnimePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    tag<T extends TagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TagDefaultArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnimeTag model
   */ 
  interface AnimeTagFieldRefs {
    readonly animeId: FieldRef<"AnimeTag", 'Int'>
    readonly tagId: FieldRef<"AnimeTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AnimeTag findUnique
   */
  export type AnimeTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    /**
     * Filter, which AnimeTag to fetch.
     */
    where: AnimeTagWhereUniqueInput
  }

  /**
   * AnimeTag findUniqueOrThrow
   */
  export type AnimeTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    /**
     * Filter, which AnimeTag to fetch.
     */
    where: AnimeTagWhereUniqueInput
  }

  /**
   * AnimeTag findFirst
   */
  export type AnimeTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    /**
     * Filter, which AnimeTag to fetch.
     */
    where?: AnimeTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnimeTags to fetch.
     */
    orderBy?: AnimeTagOrderByWithRelationInput | AnimeTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnimeTags.
     */
    cursor?: AnimeTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnimeTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnimeTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnimeTags.
     */
    distinct?: AnimeTagScalarFieldEnum | AnimeTagScalarFieldEnum[]
  }

  /**
   * AnimeTag findFirstOrThrow
   */
  export type AnimeTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    /**
     * Filter, which AnimeTag to fetch.
     */
    where?: AnimeTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnimeTags to fetch.
     */
    orderBy?: AnimeTagOrderByWithRelationInput | AnimeTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnimeTags.
     */
    cursor?: AnimeTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnimeTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnimeTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnimeTags.
     */
    distinct?: AnimeTagScalarFieldEnum | AnimeTagScalarFieldEnum[]
  }

  /**
   * AnimeTag findMany
   */
  export type AnimeTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    /**
     * Filter, which AnimeTags to fetch.
     */
    where?: AnimeTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnimeTags to fetch.
     */
    orderBy?: AnimeTagOrderByWithRelationInput | AnimeTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnimeTags.
     */
    cursor?: AnimeTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnimeTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnimeTags.
     */
    skip?: number
    distinct?: AnimeTagScalarFieldEnum | AnimeTagScalarFieldEnum[]
  }

  /**
   * AnimeTag create
   */
  export type AnimeTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    /**
     * The data needed to create a AnimeTag.
     */
    data: XOR<AnimeTagCreateInput, AnimeTagUncheckedCreateInput>
  }

  /**
   * AnimeTag createMany
   */
  export type AnimeTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnimeTags.
     */
    data: AnimeTagCreateManyInput | AnimeTagCreateManyInput[]
  }

  /**
   * AnimeTag createManyAndReturn
   */
  export type AnimeTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AnimeTags.
     */
    data: AnimeTagCreateManyInput | AnimeTagCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AnimeTag update
   */
  export type AnimeTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    /**
     * The data needed to update a AnimeTag.
     */
    data: XOR<AnimeTagUpdateInput, AnimeTagUncheckedUpdateInput>
    /**
     * Choose, which AnimeTag to update.
     */
    where: AnimeTagWhereUniqueInput
  }

  /**
   * AnimeTag updateMany
   */
  export type AnimeTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnimeTags.
     */
    data: XOR<AnimeTagUpdateManyMutationInput, AnimeTagUncheckedUpdateManyInput>
    /**
     * Filter which AnimeTags to update
     */
    where?: AnimeTagWhereInput
  }

  /**
   * AnimeTag upsert
   */
  export type AnimeTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    /**
     * The filter to search for the AnimeTag to update in case it exists.
     */
    where: AnimeTagWhereUniqueInput
    /**
     * In case the AnimeTag found by the `where` argument doesn't exist, create a new AnimeTag with this data.
     */
    create: XOR<AnimeTagCreateInput, AnimeTagUncheckedCreateInput>
    /**
     * In case the AnimeTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnimeTagUpdateInput, AnimeTagUncheckedUpdateInput>
  }

  /**
   * AnimeTag delete
   */
  export type AnimeTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
    /**
     * Filter which AnimeTag to delete.
     */
    where: AnimeTagWhereUniqueInput
  }

  /**
   * AnimeTag deleteMany
   */
  export type AnimeTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnimeTags to delete
     */
    where?: AnimeTagWhereInput
  }

  /**
   * AnimeTag without action
   */
  export type AnimeTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnimeTag
     */
    select?: AnimeTagSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AnimeTagInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BookScalarFieldEnum: {
    id: 'id',
    title: 'title',
    author: 'author',
    publisher: 'publisher',
    publishYear: 'publishYear',
    isbn: 'isbn',
    coverUrl: 'coverUrl',
    description: 'description',
    status: 'status',
    rating: 'rating',
    notes: 'notes',
    startDate: 'startDate',
    finishDate: 'finishDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BookScalarFieldEnum = (typeof BookScalarFieldEnum)[keyof typeof BookScalarFieldEnum]


  export const AnimeScalarFieldEnum: {
    id: 'id',
    titleCn: 'titleCn',
    titleJp: 'titleJp',
    coverUrl: 'coverUrl',
    summary: 'summary',
    studio: 'studio',
    airDate: 'airDate',
    totalEpisodes: 'totalEpisodes',
    watchedEpisodes: 'watchedEpisodes',
    bangumiId: 'bangumiId',
    status: 'status',
    rating: 'rating',
    notes: 'notes',
    startDate: 'startDate',
    finishDate: 'finishDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AnimeScalarFieldEnum = (typeof AnimeScalarFieldEnum)[keyof typeof AnimeScalarFieldEnum]


  export const MusicScalarFieldEnum: {
    id: 'id',
    title: 'title',
    artist: 'artist',
    album: 'album',
    coverUrl: 'coverUrl',
    qqMusicId: 'qqMusicId',
    playlistId: 'playlistId',
    duration: 'duration',
    status: 'status',
    rating: 'rating',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MusicScalarFieldEnum = (typeof MusicScalarFieldEnum)[keyof typeof MusicScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    color: 'color',
    createdAt: 'createdAt'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const MusicTagScalarFieldEnum: {
    musicId: 'musicId',
    tagId: 'tagId'
  };

  export type MusicTagScalarFieldEnum = (typeof MusicTagScalarFieldEnum)[keyof typeof MusicTagScalarFieldEnum]


  export const BookTagScalarFieldEnum: {
    bookId: 'bookId',
    tagId: 'tagId'
  };

  export type BookTagScalarFieldEnum = (typeof BookTagScalarFieldEnum)[keyof typeof BookTagScalarFieldEnum]


  export const AnimeTagScalarFieldEnum: {
    animeId: 'animeId',
    tagId: 'tagId'
  };

  export type AnimeTagScalarFieldEnum = (typeof AnimeTagScalarFieldEnum)[keyof typeof AnimeTagScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type BookWhereInput = {
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    id?: IntFilter<"Book"> | number
    title?: StringFilter<"Book"> | string
    author?: StringFilter<"Book"> | string
    publisher?: StringNullableFilter<"Book"> | string | null
    publishYear?: IntNullableFilter<"Book"> | number | null
    isbn?: StringNullableFilter<"Book"> | string | null
    coverUrl?: StringNullableFilter<"Book"> | string | null
    description?: StringNullableFilter<"Book"> | string | null
    status?: StringFilter<"Book"> | string
    rating?: IntNullableFilter<"Book"> | number | null
    notes?: StringNullableFilter<"Book"> | string | null
    startDate?: DateTimeNullableFilter<"Book"> | Date | string | null
    finishDate?: DateTimeNullableFilter<"Book"> | Date | string | null
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
    tags?: BookTagListRelationFilter
  }

  export type BookOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    publisher?: SortOrderInput | SortOrder
    publishYear?: SortOrderInput | SortOrder
    isbn?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    finishDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: BookTagOrderByRelationAggregateInput
  }

  export type BookWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BookWhereInput | BookWhereInput[]
    OR?: BookWhereInput[]
    NOT?: BookWhereInput | BookWhereInput[]
    title?: StringFilter<"Book"> | string
    author?: StringFilter<"Book"> | string
    publisher?: StringNullableFilter<"Book"> | string | null
    publishYear?: IntNullableFilter<"Book"> | number | null
    isbn?: StringNullableFilter<"Book"> | string | null
    coverUrl?: StringNullableFilter<"Book"> | string | null
    description?: StringNullableFilter<"Book"> | string | null
    status?: StringFilter<"Book"> | string
    rating?: IntNullableFilter<"Book"> | number | null
    notes?: StringNullableFilter<"Book"> | string | null
    startDate?: DateTimeNullableFilter<"Book"> | Date | string | null
    finishDate?: DateTimeNullableFilter<"Book"> | Date | string | null
    createdAt?: DateTimeFilter<"Book"> | Date | string
    updatedAt?: DateTimeFilter<"Book"> | Date | string
    tags?: BookTagListRelationFilter
  }, "id">

  export type BookOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    publisher?: SortOrderInput | SortOrder
    publishYear?: SortOrderInput | SortOrder
    isbn?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    finishDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BookCountOrderByAggregateInput
    _avg?: BookAvgOrderByAggregateInput
    _max?: BookMaxOrderByAggregateInput
    _min?: BookMinOrderByAggregateInput
    _sum?: BookSumOrderByAggregateInput
  }

  export type BookScalarWhereWithAggregatesInput = {
    AND?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    OR?: BookScalarWhereWithAggregatesInput[]
    NOT?: BookScalarWhereWithAggregatesInput | BookScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Book"> | number
    title?: StringWithAggregatesFilter<"Book"> | string
    author?: StringWithAggregatesFilter<"Book"> | string
    publisher?: StringNullableWithAggregatesFilter<"Book"> | string | null
    publishYear?: IntNullableWithAggregatesFilter<"Book"> | number | null
    isbn?: StringNullableWithAggregatesFilter<"Book"> | string | null
    coverUrl?: StringNullableWithAggregatesFilter<"Book"> | string | null
    description?: StringNullableWithAggregatesFilter<"Book"> | string | null
    status?: StringWithAggregatesFilter<"Book"> | string
    rating?: IntNullableWithAggregatesFilter<"Book"> | number | null
    notes?: StringNullableWithAggregatesFilter<"Book"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Book"> | Date | string | null
    finishDate?: DateTimeNullableWithAggregatesFilter<"Book"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Book"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Book"> | Date | string
  }

  export type AnimeWhereInput = {
    AND?: AnimeWhereInput | AnimeWhereInput[]
    OR?: AnimeWhereInput[]
    NOT?: AnimeWhereInput | AnimeWhereInput[]
    id?: IntFilter<"Anime"> | number
    titleCn?: StringFilter<"Anime"> | string
    titleJp?: StringNullableFilter<"Anime"> | string | null
    coverUrl?: StringNullableFilter<"Anime"> | string | null
    summary?: StringNullableFilter<"Anime"> | string | null
    studio?: StringNullableFilter<"Anime"> | string | null
    airDate?: DateTimeNullableFilter<"Anime"> | Date | string | null
    totalEpisodes?: IntNullableFilter<"Anime"> | number | null
    watchedEpisodes?: IntFilter<"Anime"> | number
    bangumiId?: IntNullableFilter<"Anime"> | number | null
    status?: StringFilter<"Anime"> | string
    rating?: IntNullableFilter<"Anime"> | number | null
    notes?: StringNullableFilter<"Anime"> | string | null
    startDate?: DateTimeNullableFilter<"Anime"> | Date | string | null
    finishDate?: DateTimeNullableFilter<"Anime"> | Date | string | null
    createdAt?: DateTimeFilter<"Anime"> | Date | string
    updatedAt?: DateTimeFilter<"Anime"> | Date | string
    tags?: AnimeTagListRelationFilter
  }

  export type AnimeOrderByWithRelationInput = {
    id?: SortOrder
    titleCn?: SortOrder
    titleJp?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    studio?: SortOrderInput | SortOrder
    airDate?: SortOrderInput | SortOrder
    totalEpisodes?: SortOrderInput | SortOrder
    watchedEpisodes?: SortOrder
    bangumiId?: SortOrderInput | SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    finishDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: AnimeTagOrderByRelationAggregateInput
  }

  export type AnimeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AnimeWhereInput | AnimeWhereInput[]
    OR?: AnimeWhereInput[]
    NOT?: AnimeWhereInput | AnimeWhereInput[]
    titleCn?: StringFilter<"Anime"> | string
    titleJp?: StringNullableFilter<"Anime"> | string | null
    coverUrl?: StringNullableFilter<"Anime"> | string | null
    summary?: StringNullableFilter<"Anime"> | string | null
    studio?: StringNullableFilter<"Anime"> | string | null
    airDate?: DateTimeNullableFilter<"Anime"> | Date | string | null
    totalEpisodes?: IntNullableFilter<"Anime"> | number | null
    watchedEpisodes?: IntFilter<"Anime"> | number
    bangumiId?: IntNullableFilter<"Anime"> | number | null
    status?: StringFilter<"Anime"> | string
    rating?: IntNullableFilter<"Anime"> | number | null
    notes?: StringNullableFilter<"Anime"> | string | null
    startDate?: DateTimeNullableFilter<"Anime"> | Date | string | null
    finishDate?: DateTimeNullableFilter<"Anime"> | Date | string | null
    createdAt?: DateTimeFilter<"Anime"> | Date | string
    updatedAt?: DateTimeFilter<"Anime"> | Date | string
    tags?: AnimeTagListRelationFilter
  }, "id">

  export type AnimeOrderByWithAggregationInput = {
    id?: SortOrder
    titleCn?: SortOrder
    titleJp?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    studio?: SortOrderInput | SortOrder
    airDate?: SortOrderInput | SortOrder
    totalEpisodes?: SortOrderInput | SortOrder
    watchedEpisodes?: SortOrder
    bangumiId?: SortOrderInput | SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    finishDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AnimeCountOrderByAggregateInput
    _avg?: AnimeAvgOrderByAggregateInput
    _max?: AnimeMaxOrderByAggregateInput
    _min?: AnimeMinOrderByAggregateInput
    _sum?: AnimeSumOrderByAggregateInput
  }

  export type AnimeScalarWhereWithAggregatesInput = {
    AND?: AnimeScalarWhereWithAggregatesInput | AnimeScalarWhereWithAggregatesInput[]
    OR?: AnimeScalarWhereWithAggregatesInput[]
    NOT?: AnimeScalarWhereWithAggregatesInput | AnimeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Anime"> | number
    titleCn?: StringWithAggregatesFilter<"Anime"> | string
    titleJp?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    coverUrl?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    summary?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    studio?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    airDate?: DateTimeNullableWithAggregatesFilter<"Anime"> | Date | string | null
    totalEpisodes?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    watchedEpisodes?: IntWithAggregatesFilter<"Anime"> | number
    bangumiId?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    status?: StringWithAggregatesFilter<"Anime"> | string
    rating?: IntNullableWithAggregatesFilter<"Anime"> | number | null
    notes?: StringNullableWithAggregatesFilter<"Anime"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Anime"> | Date | string | null
    finishDate?: DateTimeNullableWithAggregatesFilter<"Anime"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Anime"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Anime"> | Date | string
  }

  export type MusicWhereInput = {
    AND?: MusicWhereInput | MusicWhereInput[]
    OR?: MusicWhereInput[]
    NOT?: MusicWhereInput | MusicWhereInput[]
    id?: IntFilter<"Music"> | number
    title?: StringFilter<"Music"> | string
    artist?: StringFilter<"Music"> | string
    album?: StringNullableFilter<"Music"> | string | null
    coverUrl?: StringNullableFilter<"Music"> | string | null
    qqMusicId?: StringNullableFilter<"Music"> | string | null
    playlistId?: StringNullableFilter<"Music"> | string | null
    duration?: IntNullableFilter<"Music"> | number | null
    status?: StringFilter<"Music"> | string
    rating?: IntNullableFilter<"Music"> | number | null
    notes?: StringNullableFilter<"Music"> | string | null
    createdAt?: DateTimeFilter<"Music"> | Date | string
    updatedAt?: DateTimeFilter<"Music"> | Date | string
    tags?: MusicTagListRelationFilter
  }

  export type MusicOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    album?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    qqMusicId?: SortOrderInput | SortOrder
    playlistId?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    tags?: MusicTagOrderByRelationAggregateInput
  }

  export type MusicWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MusicWhereInput | MusicWhereInput[]
    OR?: MusicWhereInput[]
    NOT?: MusicWhereInput | MusicWhereInput[]
    title?: StringFilter<"Music"> | string
    artist?: StringFilter<"Music"> | string
    album?: StringNullableFilter<"Music"> | string | null
    coverUrl?: StringNullableFilter<"Music"> | string | null
    qqMusicId?: StringNullableFilter<"Music"> | string | null
    playlistId?: StringNullableFilter<"Music"> | string | null
    duration?: IntNullableFilter<"Music"> | number | null
    status?: StringFilter<"Music"> | string
    rating?: IntNullableFilter<"Music"> | number | null
    notes?: StringNullableFilter<"Music"> | string | null
    createdAt?: DateTimeFilter<"Music"> | Date | string
    updatedAt?: DateTimeFilter<"Music"> | Date | string
    tags?: MusicTagListRelationFilter
  }, "id">

  export type MusicOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    album?: SortOrderInput | SortOrder
    coverUrl?: SortOrderInput | SortOrder
    qqMusicId?: SortOrderInput | SortOrder
    playlistId?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    status?: SortOrder
    rating?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MusicCountOrderByAggregateInput
    _avg?: MusicAvgOrderByAggregateInput
    _max?: MusicMaxOrderByAggregateInput
    _min?: MusicMinOrderByAggregateInput
    _sum?: MusicSumOrderByAggregateInput
  }

  export type MusicScalarWhereWithAggregatesInput = {
    AND?: MusicScalarWhereWithAggregatesInput | MusicScalarWhereWithAggregatesInput[]
    OR?: MusicScalarWhereWithAggregatesInput[]
    NOT?: MusicScalarWhereWithAggregatesInput | MusicScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Music"> | number
    title?: StringWithAggregatesFilter<"Music"> | string
    artist?: StringWithAggregatesFilter<"Music"> | string
    album?: StringNullableWithAggregatesFilter<"Music"> | string | null
    coverUrl?: StringNullableWithAggregatesFilter<"Music"> | string | null
    qqMusicId?: StringNullableWithAggregatesFilter<"Music"> | string | null
    playlistId?: StringNullableWithAggregatesFilter<"Music"> | string | null
    duration?: IntNullableWithAggregatesFilter<"Music"> | number | null
    status?: StringWithAggregatesFilter<"Music"> | string
    rating?: IntNullableWithAggregatesFilter<"Music"> | number | null
    notes?: StringNullableWithAggregatesFilter<"Music"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Music"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Music"> | Date | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: IntFilter<"Tag"> | number
    name?: StringFilter<"Tag"> | string
    color?: StringFilter<"Tag"> | string
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    books?: BookTagListRelationFilter
    animes?: AnimeTagListRelationFilter
    musics?: MusicTagListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    books?: BookTagOrderByRelationAggregateInput
    animes?: AnimeTagOrderByRelationAggregateInput
    musics?: MusicTagOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    color?: StringFilter<"Tag"> | string
    createdAt?: DateTimeFilter<"Tag"> | Date | string
    books?: BookTagListRelationFilter
    animes?: AnimeTagListRelationFilter
    musics?: MusicTagListRelationFilter
  }, "id" | "name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _avg?: TagAvgOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
    _sum?: TagSumOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tag"> | number
    name?: StringWithAggregatesFilter<"Tag"> | string
    color?: StringWithAggregatesFilter<"Tag"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Tag"> | Date | string
  }

  export type MusicTagWhereInput = {
    AND?: MusicTagWhereInput | MusicTagWhereInput[]
    OR?: MusicTagWhereInput[]
    NOT?: MusicTagWhereInput | MusicTagWhereInput[]
    musicId?: IntFilter<"MusicTag"> | number
    tagId?: IntFilter<"MusicTag"> | number
    music?: XOR<MusicRelationFilter, MusicWhereInput>
    tag?: XOR<TagRelationFilter, TagWhereInput>
  }

  export type MusicTagOrderByWithRelationInput = {
    musicId?: SortOrder
    tagId?: SortOrder
    music?: MusicOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type MusicTagWhereUniqueInput = Prisma.AtLeast<{
    musicId_tagId?: MusicTagMusicIdTagIdCompoundUniqueInput
    AND?: MusicTagWhereInput | MusicTagWhereInput[]
    OR?: MusicTagWhereInput[]
    NOT?: MusicTagWhereInput | MusicTagWhereInput[]
    musicId?: IntFilter<"MusicTag"> | number
    tagId?: IntFilter<"MusicTag"> | number
    music?: XOR<MusicRelationFilter, MusicWhereInput>
    tag?: XOR<TagRelationFilter, TagWhereInput>
  }, "musicId_tagId">

  export type MusicTagOrderByWithAggregationInput = {
    musicId?: SortOrder
    tagId?: SortOrder
    _count?: MusicTagCountOrderByAggregateInput
    _avg?: MusicTagAvgOrderByAggregateInput
    _max?: MusicTagMaxOrderByAggregateInput
    _min?: MusicTagMinOrderByAggregateInput
    _sum?: MusicTagSumOrderByAggregateInput
  }

  export type MusicTagScalarWhereWithAggregatesInput = {
    AND?: MusicTagScalarWhereWithAggregatesInput | MusicTagScalarWhereWithAggregatesInput[]
    OR?: MusicTagScalarWhereWithAggregatesInput[]
    NOT?: MusicTagScalarWhereWithAggregatesInput | MusicTagScalarWhereWithAggregatesInput[]
    musicId?: IntWithAggregatesFilter<"MusicTag"> | number
    tagId?: IntWithAggregatesFilter<"MusicTag"> | number
  }

  export type BookTagWhereInput = {
    AND?: BookTagWhereInput | BookTagWhereInput[]
    OR?: BookTagWhereInput[]
    NOT?: BookTagWhereInput | BookTagWhereInput[]
    bookId?: IntFilter<"BookTag"> | number
    tagId?: IntFilter<"BookTag"> | number
    book?: XOR<BookRelationFilter, BookWhereInput>
    tag?: XOR<TagRelationFilter, TagWhereInput>
  }

  export type BookTagOrderByWithRelationInput = {
    bookId?: SortOrder
    tagId?: SortOrder
    book?: BookOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type BookTagWhereUniqueInput = Prisma.AtLeast<{
    bookId_tagId?: BookTagBookIdTagIdCompoundUniqueInput
    AND?: BookTagWhereInput | BookTagWhereInput[]
    OR?: BookTagWhereInput[]
    NOT?: BookTagWhereInput | BookTagWhereInput[]
    bookId?: IntFilter<"BookTag"> | number
    tagId?: IntFilter<"BookTag"> | number
    book?: XOR<BookRelationFilter, BookWhereInput>
    tag?: XOR<TagRelationFilter, TagWhereInput>
  }, "bookId_tagId">

  export type BookTagOrderByWithAggregationInput = {
    bookId?: SortOrder
    tagId?: SortOrder
    _count?: BookTagCountOrderByAggregateInput
    _avg?: BookTagAvgOrderByAggregateInput
    _max?: BookTagMaxOrderByAggregateInput
    _min?: BookTagMinOrderByAggregateInput
    _sum?: BookTagSumOrderByAggregateInput
  }

  export type BookTagScalarWhereWithAggregatesInput = {
    AND?: BookTagScalarWhereWithAggregatesInput | BookTagScalarWhereWithAggregatesInput[]
    OR?: BookTagScalarWhereWithAggregatesInput[]
    NOT?: BookTagScalarWhereWithAggregatesInput | BookTagScalarWhereWithAggregatesInput[]
    bookId?: IntWithAggregatesFilter<"BookTag"> | number
    tagId?: IntWithAggregatesFilter<"BookTag"> | number
  }

  export type AnimeTagWhereInput = {
    AND?: AnimeTagWhereInput | AnimeTagWhereInput[]
    OR?: AnimeTagWhereInput[]
    NOT?: AnimeTagWhereInput | AnimeTagWhereInput[]
    animeId?: IntFilter<"AnimeTag"> | number
    tagId?: IntFilter<"AnimeTag"> | number
    anime?: XOR<AnimeRelationFilter, AnimeWhereInput>
    tag?: XOR<TagRelationFilter, TagWhereInput>
  }

  export type AnimeTagOrderByWithRelationInput = {
    animeId?: SortOrder
    tagId?: SortOrder
    anime?: AnimeOrderByWithRelationInput
    tag?: TagOrderByWithRelationInput
  }

  export type AnimeTagWhereUniqueInput = Prisma.AtLeast<{
    animeId_tagId?: AnimeTagAnimeIdTagIdCompoundUniqueInput
    AND?: AnimeTagWhereInput | AnimeTagWhereInput[]
    OR?: AnimeTagWhereInput[]
    NOT?: AnimeTagWhereInput | AnimeTagWhereInput[]
    animeId?: IntFilter<"AnimeTag"> | number
    tagId?: IntFilter<"AnimeTag"> | number
    anime?: XOR<AnimeRelationFilter, AnimeWhereInput>
    tag?: XOR<TagRelationFilter, TagWhereInput>
  }, "animeId_tagId">

  export type AnimeTagOrderByWithAggregationInput = {
    animeId?: SortOrder
    tagId?: SortOrder
    _count?: AnimeTagCountOrderByAggregateInput
    _avg?: AnimeTagAvgOrderByAggregateInput
    _max?: AnimeTagMaxOrderByAggregateInput
    _min?: AnimeTagMinOrderByAggregateInput
    _sum?: AnimeTagSumOrderByAggregateInput
  }

  export type AnimeTagScalarWhereWithAggregatesInput = {
    AND?: AnimeTagScalarWhereWithAggregatesInput | AnimeTagScalarWhereWithAggregatesInput[]
    OR?: AnimeTagScalarWhereWithAggregatesInput[]
    NOT?: AnimeTagScalarWhereWithAggregatesInput | AnimeTagScalarWhereWithAggregatesInput[]
    animeId?: IntWithAggregatesFilter<"AnimeTag"> | number
    tagId?: IntWithAggregatesFilter<"AnimeTag"> | number
  }

  export type BookCreateInput = {
    title: string
    author: string
    publisher?: string | null
    publishYear?: number | null
    isbn?: string | null
    coverUrl?: string | null
    description?: string | null
    status?: string
    rating?: number | null
    notes?: string | null
    startDate?: Date | string | null
    finishDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: BookTagCreateNestedManyWithoutBookInput
  }

  export type BookUncheckedCreateInput = {
    id?: number
    title: string
    author: string
    publisher?: string | null
    publishYear?: number | null
    isbn?: string | null
    coverUrl?: string | null
    description?: string | null
    status?: string
    rating?: number | null
    notes?: string | null
    startDate?: Date | string | null
    finishDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: BookTagUncheckedCreateNestedManyWithoutBookInput
  }

  export type BookUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    publishYear?: NullableIntFieldUpdateOperationsInput | number | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: BookTagUpdateManyWithoutBookNestedInput
  }

  export type BookUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    publishYear?: NullableIntFieldUpdateOperationsInput | number | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: BookTagUncheckedUpdateManyWithoutBookNestedInput
  }

  export type BookCreateManyInput = {
    id?: number
    title: string
    author: string
    publisher?: string | null
    publishYear?: number | null
    isbn?: string | null
    coverUrl?: string | null
    description?: string | null
    status?: string
    rating?: number | null
    notes?: string | null
    startDate?: Date | string | null
    finishDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    publishYear?: NullableIntFieldUpdateOperationsInput | number | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    publishYear?: NullableIntFieldUpdateOperationsInput | number | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimeCreateInput = {
    titleCn: string
    titleJp?: string | null
    coverUrl?: string | null
    summary?: string | null
    studio?: string | null
    airDate?: Date | string | null
    totalEpisodes?: number | null
    watchedEpisodes?: number
    bangumiId?: number | null
    status?: string
    rating?: number | null
    notes?: string | null
    startDate?: Date | string | null
    finishDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: AnimeTagCreateNestedManyWithoutAnimeInput
  }

  export type AnimeUncheckedCreateInput = {
    id?: number
    titleCn: string
    titleJp?: string | null
    coverUrl?: string | null
    summary?: string | null
    studio?: string | null
    airDate?: Date | string | null
    totalEpisodes?: number | null
    watchedEpisodes?: number
    bangumiId?: number | null
    status?: string
    rating?: number | null
    notes?: string | null
    startDate?: Date | string | null
    finishDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: AnimeTagUncheckedCreateNestedManyWithoutAnimeInput
  }

  export type AnimeUpdateInput = {
    titleCn?: StringFieldUpdateOperationsInput | string
    titleJp?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    studio?: NullableStringFieldUpdateOperationsInput | string | null
    airDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    watchedEpisodes?: IntFieldUpdateOperationsInput | number
    bangumiId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: AnimeTagUpdateManyWithoutAnimeNestedInput
  }

  export type AnimeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleCn?: StringFieldUpdateOperationsInput | string
    titleJp?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    studio?: NullableStringFieldUpdateOperationsInput | string | null
    airDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    watchedEpisodes?: IntFieldUpdateOperationsInput | number
    bangumiId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: AnimeTagUncheckedUpdateManyWithoutAnimeNestedInput
  }

  export type AnimeCreateManyInput = {
    id?: number
    titleCn: string
    titleJp?: string | null
    coverUrl?: string | null
    summary?: string | null
    studio?: string | null
    airDate?: Date | string | null
    totalEpisodes?: number | null
    watchedEpisodes?: number
    bangumiId?: number | null
    status?: string
    rating?: number | null
    notes?: string | null
    startDate?: Date | string | null
    finishDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimeUpdateManyMutationInput = {
    titleCn?: StringFieldUpdateOperationsInput | string
    titleJp?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    studio?: NullableStringFieldUpdateOperationsInput | string | null
    airDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    watchedEpisodes?: IntFieldUpdateOperationsInput | number
    bangumiId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleCn?: StringFieldUpdateOperationsInput | string
    titleJp?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    studio?: NullableStringFieldUpdateOperationsInput | string | null
    airDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    watchedEpisodes?: IntFieldUpdateOperationsInput | number
    bangumiId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MusicCreateInput = {
    title: string
    artist: string
    album?: string | null
    coverUrl?: string | null
    qqMusicId?: string | null
    playlistId?: string | null
    duration?: number | null
    status?: string
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: MusicTagCreateNestedManyWithoutMusicInput
  }

  export type MusicUncheckedCreateInput = {
    id?: number
    title: string
    artist: string
    album?: string | null
    coverUrl?: string | null
    qqMusicId?: string | null
    playlistId?: string | null
    duration?: number | null
    status?: string
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: MusicTagUncheckedCreateNestedManyWithoutMusicInput
  }

  export type MusicUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    album?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qqMusicId?: NullableStringFieldUpdateOperationsInput | string | null
    playlistId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: MusicTagUpdateManyWithoutMusicNestedInput
  }

  export type MusicUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    album?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qqMusicId?: NullableStringFieldUpdateOperationsInput | string | null
    playlistId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: MusicTagUncheckedUpdateManyWithoutMusicNestedInput
  }

  export type MusicCreateManyInput = {
    id?: number
    title: string
    artist: string
    album?: string | null
    coverUrl?: string | null
    qqMusicId?: string | null
    playlistId?: string | null
    duration?: number | null
    status?: string
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MusicUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    album?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qqMusicId?: NullableStringFieldUpdateOperationsInput | string | null
    playlistId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MusicUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    album?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qqMusicId?: NullableStringFieldUpdateOperationsInput | string | null
    playlistId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagCreateInput = {
    name: string
    color?: string
    createdAt?: Date | string
    books?: BookTagCreateNestedManyWithoutTagInput
    animes?: AnimeTagCreateNestedManyWithoutTagInput
    musics?: MusicTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateInput = {
    id?: number
    name: string
    color?: string
    createdAt?: Date | string
    books?: BookTagUncheckedCreateNestedManyWithoutTagInput
    animes?: AnimeTagUncheckedCreateNestedManyWithoutTagInput
    musics?: MusicTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookTagUpdateManyWithoutTagNestedInput
    animes?: AnimeTagUpdateManyWithoutTagNestedInput
    musics?: MusicTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookTagUncheckedUpdateManyWithoutTagNestedInput
    animes?: AnimeTagUncheckedUpdateManyWithoutTagNestedInput
    musics?: MusicTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type TagCreateManyInput = {
    id?: number
    name: string
    color?: string
    createdAt?: Date | string
  }

  export type TagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MusicTagCreateInput = {
    music: MusicCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutMusicsInput
  }

  export type MusicTagUncheckedCreateInput = {
    musicId: number
    tagId: number
  }

  export type MusicTagUpdateInput = {
    music?: MusicUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutMusicsNestedInput
  }

  export type MusicTagUncheckedUpdateInput = {
    musicId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicTagCreateManyInput = {
    musicId: number
    tagId: number
  }

  export type MusicTagUpdateManyMutationInput = {

  }

  export type MusicTagUncheckedUpdateManyInput = {
    musicId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type BookTagCreateInput = {
    book: BookCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutBooksInput
  }

  export type BookTagUncheckedCreateInput = {
    bookId: number
    tagId: number
  }

  export type BookTagUpdateInput = {
    book?: BookUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutBooksNestedInput
  }

  export type BookTagUncheckedUpdateInput = {
    bookId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type BookTagCreateManyInput = {
    bookId: number
    tagId: number
  }

  export type BookTagUpdateManyMutationInput = {

  }

  export type BookTagUncheckedUpdateManyInput = {
    bookId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type AnimeTagCreateInput = {
    anime: AnimeCreateNestedOneWithoutTagsInput
    tag: TagCreateNestedOneWithoutAnimesInput
  }

  export type AnimeTagUncheckedCreateInput = {
    animeId: number
    tagId: number
  }

  export type AnimeTagUpdateInput = {
    anime?: AnimeUpdateOneRequiredWithoutTagsNestedInput
    tag?: TagUpdateOneRequiredWithoutAnimesNestedInput
  }

  export type AnimeTagUncheckedUpdateInput = {
    animeId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type AnimeTagCreateManyInput = {
    animeId: number
    tagId: number
  }

  export type AnimeTagUpdateManyMutationInput = {

  }

  export type AnimeTagUncheckedUpdateManyInput = {
    animeId?: IntFieldUpdateOperationsInput | number
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BookTagListRelationFilter = {
    every?: BookTagWhereInput
    some?: BookTagWhereInput
    none?: BookTagWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BookTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BookCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    publisher?: SortOrder
    publishYear?: SortOrder
    isbn?: SortOrder
    coverUrl?: SortOrder
    description?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    finishDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookAvgOrderByAggregateInput = {
    id?: SortOrder
    publishYear?: SortOrder
    rating?: SortOrder
  }

  export type BookMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    publisher?: SortOrder
    publishYear?: SortOrder
    isbn?: SortOrder
    coverUrl?: SortOrder
    description?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    finishDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    author?: SortOrder
    publisher?: SortOrder
    publishYear?: SortOrder
    isbn?: SortOrder
    coverUrl?: SortOrder
    description?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    finishDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BookSumOrderByAggregateInput = {
    id?: SortOrder
    publishYear?: SortOrder
    rating?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type AnimeTagListRelationFilter = {
    every?: AnimeTagWhereInput
    some?: AnimeTagWhereInput
    none?: AnimeTagWhereInput
  }

  export type AnimeTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AnimeCountOrderByAggregateInput = {
    id?: SortOrder
    titleCn?: SortOrder
    titleJp?: SortOrder
    coverUrl?: SortOrder
    summary?: SortOrder
    studio?: SortOrder
    airDate?: SortOrder
    totalEpisodes?: SortOrder
    watchedEpisodes?: SortOrder
    bangumiId?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    finishDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimeAvgOrderByAggregateInput = {
    id?: SortOrder
    totalEpisodes?: SortOrder
    watchedEpisodes?: SortOrder
    bangumiId?: SortOrder
    rating?: SortOrder
  }

  export type AnimeMaxOrderByAggregateInput = {
    id?: SortOrder
    titleCn?: SortOrder
    titleJp?: SortOrder
    coverUrl?: SortOrder
    summary?: SortOrder
    studio?: SortOrder
    airDate?: SortOrder
    totalEpisodes?: SortOrder
    watchedEpisodes?: SortOrder
    bangumiId?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    finishDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimeMinOrderByAggregateInput = {
    id?: SortOrder
    titleCn?: SortOrder
    titleJp?: SortOrder
    coverUrl?: SortOrder
    summary?: SortOrder
    studio?: SortOrder
    airDate?: SortOrder
    totalEpisodes?: SortOrder
    watchedEpisodes?: SortOrder
    bangumiId?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    startDate?: SortOrder
    finishDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AnimeSumOrderByAggregateInput = {
    id?: SortOrder
    totalEpisodes?: SortOrder
    watchedEpisodes?: SortOrder
    bangumiId?: SortOrder
    rating?: SortOrder
  }

  export type MusicTagListRelationFilter = {
    every?: MusicTagWhereInput
    some?: MusicTagWhereInput
    none?: MusicTagWhereInput
  }

  export type MusicTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MusicCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    album?: SortOrder
    coverUrl?: SortOrder
    qqMusicId?: SortOrder
    playlistId?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MusicAvgOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    rating?: SortOrder
  }

  export type MusicMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    album?: SortOrder
    coverUrl?: SortOrder
    qqMusicId?: SortOrder
    playlistId?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MusicMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    artist?: SortOrder
    album?: SortOrder
    coverUrl?: SortOrder
    qqMusicId?: SortOrder
    playlistId?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    rating?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MusicSumOrderByAggregateInput = {
    id?: SortOrder
    duration?: SortOrder
    rating?: SortOrder
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
  }

  export type TagAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    color?: SortOrder
    createdAt?: SortOrder
  }

  export type TagSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MusicRelationFilter = {
    is?: MusicWhereInput
    isNot?: MusicWhereInput
  }

  export type TagRelationFilter = {
    is?: TagWhereInput
    isNot?: TagWhereInput
  }

  export type MusicTagMusicIdTagIdCompoundUniqueInput = {
    musicId: number
    tagId: number
  }

  export type MusicTagCountOrderByAggregateInput = {
    musicId?: SortOrder
    tagId?: SortOrder
  }

  export type MusicTagAvgOrderByAggregateInput = {
    musicId?: SortOrder
    tagId?: SortOrder
  }

  export type MusicTagMaxOrderByAggregateInput = {
    musicId?: SortOrder
    tagId?: SortOrder
  }

  export type MusicTagMinOrderByAggregateInput = {
    musicId?: SortOrder
    tagId?: SortOrder
  }

  export type MusicTagSumOrderByAggregateInput = {
    musicId?: SortOrder
    tagId?: SortOrder
  }

  export type BookRelationFilter = {
    is?: BookWhereInput
    isNot?: BookWhereInput
  }

  export type BookTagBookIdTagIdCompoundUniqueInput = {
    bookId: number
    tagId: number
  }

  export type BookTagCountOrderByAggregateInput = {
    bookId?: SortOrder
    tagId?: SortOrder
  }

  export type BookTagAvgOrderByAggregateInput = {
    bookId?: SortOrder
    tagId?: SortOrder
  }

  export type BookTagMaxOrderByAggregateInput = {
    bookId?: SortOrder
    tagId?: SortOrder
  }

  export type BookTagMinOrderByAggregateInput = {
    bookId?: SortOrder
    tagId?: SortOrder
  }

  export type BookTagSumOrderByAggregateInput = {
    bookId?: SortOrder
    tagId?: SortOrder
  }

  export type AnimeRelationFilter = {
    is?: AnimeWhereInput
    isNot?: AnimeWhereInput
  }

  export type AnimeTagAnimeIdTagIdCompoundUniqueInput = {
    animeId: number
    tagId: number
  }

  export type AnimeTagCountOrderByAggregateInput = {
    animeId?: SortOrder
    tagId?: SortOrder
  }

  export type AnimeTagAvgOrderByAggregateInput = {
    animeId?: SortOrder
    tagId?: SortOrder
  }

  export type AnimeTagMaxOrderByAggregateInput = {
    animeId?: SortOrder
    tagId?: SortOrder
  }

  export type AnimeTagMinOrderByAggregateInput = {
    animeId?: SortOrder
    tagId?: SortOrder
  }

  export type AnimeTagSumOrderByAggregateInput = {
    animeId?: SortOrder
    tagId?: SortOrder
  }

  export type BookTagCreateNestedManyWithoutBookInput = {
    create?: XOR<BookTagCreateWithoutBookInput, BookTagUncheckedCreateWithoutBookInput> | BookTagCreateWithoutBookInput[] | BookTagUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BookTagCreateOrConnectWithoutBookInput | BookTagCreateOrConnectWithoutBookInput[]
    createMany?: BookTagCreateManyBookInputEnvelope
    connect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
  }

  export type BookTagUncheckedCreateNestedManyWithoutBookInput = {
    create?: XOR<BookTagCreateWithoutBookInput, BookTagUncheckedCreateWithoutBookInput> | BookTagCreateWithoutBookInput[] | BookTagUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BookTagCreateOrConnectWithoutBookInput | BookTagCreateOrConnectWithoutBookInput[]
    createMany?: BookTagCreateManyBookInputEnvelope
    connect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BookTagUpdateManyWithoutBookNestedInput = {
    create?: XOR<BookTagCreateWithoutBookInput, BookTagUncheckedCreateWithoutBookInput> | BookTagCreateWithoutBookInput[] | BookTagUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BookTagCreateOrConnectWithoutBookInput | BookTagCreateOrConnectWithoutBookInput[]
    upsert?: BookTagUpsertWithWhereUniqueWithoutBookInput | BookTagUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: BookTagCreateManyBookInputEnvelope
    set?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    disconnect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    delete?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    connect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    update?: BookTagUpdateWithWhereUniqueWithoutBookInput | BookTagUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: BookTagUpdateManyWithWhereWithoutBookInput | BookTagUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: BookTagScalarWhereInput | BookTagScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BookTagUncheckedUpdateManyWithoutBookNestedInput = {
    create?: XOR<BookTagCreateWithoutBookInput, BookTagUncheckedCreateWithoutBookInput> | BookTagCreateWithoutBookInput[] | BookTagUncheckedCreateWithoutBookInput[]
    connectOrCreate?: BookTagCreateOrConnectWithoutBookInput | BookTagCreateOrConnectWithoutBookInput[]
    upsert?: BookTagUpsertWithWhereUniqueWithoutBookInput | BookTagUpsertWithWhereUniqueWithoutBookInput[]
    createMany?: BookTagCreateManyBookInputEnvelope
    set?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    disconnect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    delete?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    connect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    update?: BookTagUpdateWithWhereUniqueWithoutBookInput | BookTagUpdateWithWhereUniqueWithoutBookInput[]
    updateMany?: BookTagUpdateManyWithWhereWithoutBookInput | BookTagUpdateManyWithWhereWithoutBookInput[]
    deleteMany?: BookTagScalarWhereInput | BookTagScalarWhereInput[]
  }

  export type AnimeTagCreateNestedManyWithoutAnimeInput = {
    create?: XOR<AnimeTagCreateWithoutAnimeInput, AnimeTagUncheckedCreateWithoutAnimeInput> | AnimeTagCreateWithoutAnimeInput[] | AnimeTagUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: AnimeTagCreateOrConnectWithoutAnimeInput | AnimeTagCreateOrConnectWithoutAnimeInput[]
    createMany?: AnimeTagCreateManyAnimeInputEnvelope
    connect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
  }

  export type AnimeTagUncheckedCreateNestedManyWithoutAnimeInput = {
    create?: XOR<AnimeTagCreateWithoutAnimeInput, AnimeTagUncheckedCreateWithoutAnimeInput> | AnimeTagCreateWithoutAnimeInput[] | AnimeTagUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: AnimeTagCreateOrConnectWithoutAnimeInput | AnimeTagCreateOrConnectWithoutAnimeInput[]
    createMany?: AnimeTagCreateManyAnimeInputEnvelope
    connect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
  }

  export type AnimeTagUpdateManyWithoutAnimeNestedInput = {
    create?: XOR<AnimeTagCreateWithoutAnimeInput, AnimeTagUncheckedCreateWithoutAnimeInput> | AnimeTagCreateWithoutAnimeInput[] | AnimeTagUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: AnimeTagCreateOrConnectWithoutAnimeInput | AnimeTagCreateOrConnectWithoutAnimeInput[]
    upsert?: AnimeTagUpsertWithWhereUniqueWithoutAnimeInput | AnimeTagUpsertWithWhereUniqueWithoutAnimeInput[]
    createMany?: AnimeTagCreateManyAnimeInputEnvelope
    set?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    disconnect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    delete?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    connect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    update?: AnimeTagUpdateWithWhereUniqueWithoutAnimeInput | AnimeTagUpdateWithWhereUniqueWithoutAnimeInput[]
    updateMany?: AnimeTagUpdateManyWithWhereWithoutAnimeInput | AnimeTagUpdateManyWithWhereWithoutAnimeInput[]
    deleteMany?: AnimeTagScalarWhereInput | AnimeTagScalarWhereInput[]
  }

  export type AnimeTagUncheckedUpdateManyWithoutAnimeNestedInput = {
    create?: XOR<AnimeTagCreateWithoutAnimeInput, AnimeTagUncheckedCreateWithoutAnimeInput> | AnimeTagCreateWithoutAnimeInput[] | AnimeTagUncheckedCreateWithoutAnimeInput[]
    connectOrCreate?: AnimeTagCreateOrConnectWithoutAnimeInput | AnimeTagCreateOrConnectWithoutAnimeInput[]
    upsert?: AnimeTagUpsertWithWhereUniqueWithoutAnimeInput | AnimeTagUpsertWithWhereUniqueWithoutAnimeInput[]
    createMany?: AnimeTagCreateManyAnimeInputEnvelope
    set?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    disconnect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    delete?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    connect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    update?: AnimeTagUpdateWithWhereUniqueWithoutAnimeInput | AnimeTagUpdateWithWhereUniqueWithoutAnimeInput[]
    updateMany?: AnimeTagUpdateManyWithWhereWithoutAnimeInput | AnimeTagUpdateManyWithWhereWithoutAnimeInput[]
    deleteMany?: AnimeTagScalarWhereInput | AnimeTagScalarWhereInput[]
  }

  export type MusicTagCreateNestedManyWithoutMusicInput = {
    create?: XOR<MusicTagCreateWithoutMusicInput, MusicTagUncheckedCreateWithoutMusicInput> | MusicTagCreateWithoutMusicInput[] | MusicTagUncheckedCreateWithoutMusicInput[]
    connectOrCreate?: MusicTagCreateOrConnectWithoutMusicInput | MusicTagCreateOrConnectWithoutMusicInput[]
    createMany?: MusicTagCreateManyMusicInputEnvelope
    connect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
  }

  export type MusicTagUncheckedCreateNestedManyWithoutMusicInput = {
    create?: XOR<MusicTagCreateWithoutMusicInput, MusicTagUncheckedCreateWithoutMusicInput> | MusicTagCreateWithoutMusicInput[] | MusicTagUncheckedCreateWithoutMusicInput[]
    connectOrCreate?: MusicTagCreateOrConnectWithoutMusicInput | MusicTagCreateOrConnectWithoutMusicInput[]
    createMany?: MusicTagCreateManyMusicInputEnvelope
    connect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
  }

  export type MusicTagUpdateManyWithoutMusicNestedInput = {
    create?: XOR<MusicTagCreateWithoutMusicInput, MusicTagUncheckedCreateWithoutMusicInput> | MusicTagCreateWithoutMusicInput[] | MusicTagUncheckedCreateWithoutMusicInput[]
    connectOrCreate?: MusicTagCreateOrConnectWithoutMusicInput | MusicTagCreateOrConnectWithoutMusicInput[]
    upsert?: MusicTagUpsertWithWhereUniqueWithoutMusicInput | MusicTagUpsertWithWhereUniqueWithoutMusicInput[]
    createMany?: MusicTagCreateManyMusicInputEnvelope
    set?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    disconnect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    delete?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    connect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    update?: MusicTagUpdateWithWhereUniqueWithoutMusicInput | MusicTagUpdateWithWhereUniqueWithoutMusicInput[]
    updateMany?: MusicTagUpdateManyWithWhereWithoutMusicInput | MusicTagUpdateManyWithWhereWithoutMusicInput[]
    deleteMany?: MusicTagScalarWhereInput | MusicTagScalarWhereInput[]
  }

  export type MusicTagUncheckedUpdateManyWithoutMusicNestedInput = {
    create?: XOR<MusicTagCreateWithoutMusicInput, MusicTagUncheckedCreateWithoutMusicInput> | MusicTagCreateWithoutMusicInput[] | MusicTagUncheckedCreateWithoutMusicInput[]
    connectOrCreate?: MusicTagCreateOrConnectWithoutMusicInput | MusicTagCreateOrConnectWithoutMusicInput[]
    upsert?: MusicTagUpsertWithWhereUniqueWithoutMusicInput | MusicTagUpsertWithWhereUniqueWithoutMusicInput[]
    createMany?: MusicTagCreateManyMusicInputEnvelope
    set?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    disconnect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    delete?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    connect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    update?: MusicTagUpdateWithWhereUniqueWithoutMusicInput | MusicTagUpdateWithWhereUniqueWithoutMusicInput[]
    updateMany?: MusicTagUpdateManyWithWhereWithoutMusicInput | MusicTagUpdateManyWithWhereWithoutMusicInput[]
    deleteMany?: MusicTagScalarWhereInput | MusicTagScalarWhereInput[]
  }

  export type BookTagCreateNestedManyWithoutTagInput = {
    create?: XOR<BookTagCreateWithoutTagInput, BookTagUncheckedCreateWithoutTagInput> | BookTagCreateWithoutTagInput[] | BookTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: BookTagCreateOrConnectWithoutTagInput | BookTagCreateOrConnectWithoutTagInput[]
    createMany?: BookTagCreateManyTagInputEnvelope
    connect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
  }

  export type AnimeTagCreateNestedManyWithoutTagInput = {
    create?: XOR<AnimeTagCreateWithoutTagInput, AnimeTagUncheckedCreateWithoutTagInput> | AnimeTagCreateWithoutTagInput[] | AnimeTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: AnimeTagCreateOrConnectWithoutTagInput | AnimeTagCreateOrConnectWithoutTagInput[]
    createMany?: AnimeTagCreateManyTagInputEnvelope
    connect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
  }

  export type MusicTagCreateNestedManyWithoutTagInput = {
    create?: XOR<MusicTagCreateWithoutTagInput, MusicTagUncheckedCreateWithoutTagInput> | MusicTagCreateWithoutTagInput[] | MusicTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MusicTagCreateOrConnectWithoutTagInput | MusicTagCreateOrConnectWithoutTagInput[]
    createMany?: MusicTagCreateManyTagInputEnvelope
    connect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
  }

  export type BookTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<BookTagCreateWithoutTagInput, BookTagUncheckedCreateWithoutTagInput> | BookTagCreateWithoutTagInput[] | BookTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: BookTagCreateOrConnectWithoutTagInput | BookTagCreateOrConnectWithoutTagInput[]
    createMany?: BookTagCreateManyTagInputEnvelope
    connect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
  }

  export type AnimeTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<AnimeTagCreateWithoutTagInput, AnimeTagUncheckedCreateWithoutTagInput> | AnimeTagCreateWithoutTagInput[] | AnimeTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: AnimeTagCreateOrConnectWithoutTagInput | AnimeTagCreateOrConnectWithoutTagInput[]
    createMany?: AnimeTagCreateManyTagInputEnvelope
    connect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
  }

  export type MusicTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<MusicTagCreateWithoutTagInput, MusicTagUncheckedCreateWithoutTagInput> | MusicTagCreateWithoutTagInput[] | MusicTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MusicTagCreateOrConnectWithoutTagInput | MusicTagCreateOrConnectWithoutTagInput[]
    createMany?: MusicTagCreateManyTagInputEnvelope
    connect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
  }

  export type BookTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<BookTagCreateWithoutTagInput, BookTagUncheckedCreateWithoutTagInput> | BookTagCreateWithoutTagInput[] | BookTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: BookTagCreateOrConnectWithoutTagInput | BookTagCreateOrConnectWithoutTagInput[]
    upsert?: BookTagUpsertWithWhereUniqueWithoutTagInput | BookTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: BookTagCreateManyTagInputEnvelope
    set?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    disconnect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    delete?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    connect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    update?: BookTagUpdateWithWhereUniqueWithoutTagInput | BookTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: BookTagUpdateManyWithWhereWithoutTagInput | BookTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: BookTagScalarWhereInput | BookTagScalarWhereInput[]
  }

  export type AnimeTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<AnimeTagCreateWithoutTagInput, AnimeTagUncheckedCreateWithoutTagInput> | AnimeTagCreateWithoutTagInput[] | AnimeTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: AnimeTagCreateOrConnectWithoutTagInput | AnimeTagCreateOrConnectWithoutTagInput[]
    upsert?: AnimeTagUpsertWithWhereUniqueWithoutTagInput | AnimeTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: AnimeTagCreateManyTagInputEnvelope
    set?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    disconnect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    delete?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    connect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    update?: AnimeTagUpdateWithWhereUniqueWithoutTagInput | AnimeTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: AnimeTagUpdateManyWithWhereWithoutTagInput | AnimeTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: AnimeTagScalarWhereInput | AnimeTagScalarWhereInput[]
  }

  export type MusicTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<MusicTagCreateWithoutTagInput, MusicTagUncheckedCreateWithoutTagInput> | MusicTagCreateWithoutTagInput[] | MusicTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MusicTagCreateOrConnectWithoutTagInput | MusicTagCreateOrConnectWithoutTagInput[]
    upsert?: MusicTagUpsertWithWhereUniqueWithoutTagInput | MusicTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: MusicTagCreateManyTagInputEnvelope
    set?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    disconnect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    delete?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    connect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    update?: MusicTagUpdateWithWhereUniqueWithoutTagInput | MusicTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: MusicTagUpdateManyWithWhereWithoutTagInput | MusicTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: MusicTagScalarWhereInput | MusicTagScalarWhereInput[]
  }

  export type BookTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<BookTagCreateWithoutTagInput, BookTagUncheckedCreateWithoutTagInput> | BookTagCreateWithoutTagInput[] | BookTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: BookTagCreateOrConnectWithoutTagInput | BookTagCreateOrConnectWithoutTagInput[]
    upsert?: BookTagUpsertWithWhereUniqueWithoutTagInput | BookTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: BookTagCreateManyTagInputEnvelope
    set?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    disconnect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    delete?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    connect?: BookTagWhereUniqueInput | BookTagWhereUniqueInput[]
    update?: BookTagUpdateWithWhereUniqueWithoutTagInput | BookTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: BookTagUpdateManyWithWhereWithoutTagInput | BookTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: BookTagScalarWhereInput | BookTagScalarWhereInput[]
  }

  export type AnimeTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<AnimeTagCreateWithoutTagInput, AnimeTagUncheckedCreateWithoutTagInput> | AnimeTagCreateWithoutTagInput[] | AnimeTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: AnimeTagCreateOrConnectWithoutTagInput | AnimeTagCreateOrConnectWithoutTagInput[]
    upsert?: AnimeTagUpsertWithWhereUniqueWithoutTagInput | AnimeTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: AnimeTagCreateManyTagInputEnvelope
    set?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    disconnect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    delete?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    connect?: AnimeTagWhereUniqueInput | AnimeTagWhereUniqueInput[]
    update?: AnimeTagUpdateWithWhereUniqueWithoutTagInput | AnimeTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: AnimeTagUpdateManyWithWhereWithoutTagInput | AnimeTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: AnimeTagScalarWhereInput | AnimeTagScalarWhereInput[]
  }

  export type MusicTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<MusicTagCreateWithoutTagInput, MusicTagUncheckedCreateWithoutTagInput> | MusicTagCreateWithoutTagInput[] | MusicTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: MusicTagCreateOrConnectWithoutTagInput | MusicTagCreateOrConnectWithoutTagInput[]
    upsert?: MusicTagUpsertWithWhereUniqueWithoutTagInput | MusicTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: MusicTagCreateManyTagInputEnvelope
    set?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    disconnect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    delete?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    connect?: MusicTagWhereUniqueInput | MusicTagWhereUniqueInput[]
    update?: MusicTagUpdateWithWhereUniqueWithoutTagInput | MusicTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: MusicTagUpdateManyWithWhereWithoutTagInput | MusicTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: MusicTagScalarWhereInput | MusicTagScalarWhereInput[]
  }

  export type MusicCreateNestedOneWithoutTagsInput = {
    create?: XOR<MusicCreateWithoutTagsInput, MusicUncheckedCreateWithoutTagsInput>
    connectOrCreate?: MusicCreateOrConnectWithoutTagsInput
    connect?: MusicWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutMusicsInput = {
    create?: XOR<TagCreateWithoutMusicsInput, TagUncheckedCreateWithoutMusicsInput>
    connectOrCreate?: TagCreateOrConnectWithoutMusicsInput
    connect?: TagWhereUniqueInput
  }

  export type MusicUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<MusicCreateWithoutTagsInput, MusicUncheckedCreateWithoutTagsInput>
    connectOrCreate?: MusicCreateOrConnectWithoutTagsInput
    upsert?: MusicUpsertWithoutTagsInput
    connect?: MusicWhereUniqueInput
    update?: XOR<XOR<MusicUpdateToOneWithWhereWithoutTagsInput, MusicUpdateWithoutTagsInput>, MusicUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutMusicsNestedInput = {
    create?: XOR<TagCreateWithoutMusicsInput, TagUncheckedCreateWithoutMusicsInput>
    connectOrCreate?: TagCreateOrConnectWithoutMusicsInput
    upsert?: TagUpsertWithoutMusicsInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutMusicsInput, TagUpdateWithoutMusicsInput>, TagUncheckedUpdateWithoutMusicsInput>
  }

  export type BookCreateNestedOneWithoutTagsInput = {
    create?: XOR<BookCreateWithoutTagsInput, BookUncheckedCreateWithoutTagsInput>
    connectOrCreate?: BookCreateOrConnectWithoutTagsInput
    connect?: BookWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutBooksInput = {
    create?: XOR<TagCreateWithoutBooksInput, TagUncheckedCreateWithoutBooksInput>
    connectOrCreate?: TagCreateOrConnectWithoutBooksInput
    connect?: TagWhereUniqueInput
  }

  export type BookUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<BookCreateWithoutTagsInput, BookUncheckedCreateWithoutTagsInput>
    connectOrCreate?: BookCreateOrConnectWithoutTagsInput
    upsert?: BookUpsertWithoutTagsInput
    connect?: BookWhereUniqueInput
    update?: XOR<XOR<BookUpdateToOneWithWhereWithoutTagsInput, BookUpdateWithoutTagsInput>, BookUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutBooksNestedInput = {
    create?: XOR<TagCreateWithoutBooksInput, TagUncheckedCreateWithoutBooksInput>
    connectOrCreate?: TagCreateOrConnectWithoutBooksInput
    upsert?: TagUpsertWithoutBooksInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutBooksInput, TagUpdateWithoutBooksInput>, TagUncheckedUpdateWithoutBooksInput>
  }

  export type AnimeCreateNestedOneWithoutTagsInput = {
    create?: XOR<AnimeCreateWithoutTagsInput, AnimeUncheckedCreateWithoutTagsInput>
    connectOrCreate?: AnimeCreateOrConnectWithoutTagsInput
    connect?: AnimeWhereUniqueInput
  }

  export type TagCreateNestedOneWithoutAnimesInput = {
    create?: XOR<TagCreateWithoutAnimesInput, TagUncheckedCreateWithoutAnimesInput>
    connectOrCreate?: TagCreateOrConnectWithoutAnimesInput
    connect?: TagWhereUniqueInput
  }

  export type AnimeUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<AnimeCreateWithoutTagsInput, AnimeUncheckedCreateWithoutTagsInput>
    connectOrCreate?: AnimeCreateOrConnectWithoutTagsInput
    upsert?: AnimeUpsertWithoutTagsInput
    connect?: AnimeWhereUniqueInput
    update?: XOR<XOR<AnimeUpdateToOneWithWhereWithoutTagsInput, AnimeUpdateWithoutTagsInput>, AnimeUncheckedUpdateWithoutTagsInput>
  }

  export type TagUpdateOneRequiredWithoutAnimesNestedInput = {
    create?: XOR<TagCreateWithoutAnimesInput, TagUncheckedCreateWithoutAnimesInput>
    connectOrCreate?: TagCreateOrConnectWithoutAnimesInput
    upsert?: TagUpsertWithoutAnimesInput
    connect?: TagWhereUniqueInput
    update?: XOR<XOR<TagUpdateToOneWithWhereWithoutAnimesInput, TagUpdateWithoutAnimesInput>, TagUncheckedUpdateWithoutAnimesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BookTagCreateWithoutBookInput = {
    tag: TagCreateNestedOneWithoutBooksInput
  }

  export type BookTagUncheckedCreateWithoutBookInput = {
    tagId: number
  }

  export type BookTagCreateOrConnectWithoutBookInput = {
    where: BookTagWhereUniqueInput
    create: XOR<BookTagCreateWithoutBookInput, BookTagUncheckedCreateWithoutBookInput>
  }

  export type BookTagCreateManyBookInputEnvelope = {
    data: BookTagCreateManyBookInput | BookTagCreateManyBookInput[]
  }

  export type BookTagUpsertWithWhereUniqueWithoutBookInput = {
    where: BookTagWhereUniqueInput
    update: XOR<BookTagUpdateWithoutBookInput, BookTagUncheckedUpdateWithoutBookInput>
    create: XOR<BookTagCreateWithoutBookInput, BookTagUncheckedCreateWithoutBookInput>
  }

  export type BookTagUpdateWithWhereUniqueWithoutBookInput = {
    where: BookTagWhereUniqueInput
    data: XOR<BookTagUpdateWithoutBookInput, BookTagUncheckedUpdateWithoutBookInput>
  }

  export type BookTagUpdateManyWithWhereWithoutBookInput = {
    where: BookTagScalarWhereInput
    data: XOR<BookTagUpdateManyMutationInput, BookTagUncheckedUpdateManyWithoutBookInput>
  }

  export type BookTagScalarWhereInput = {
    AND?: BookTagScalarWhereInput | BookTagScalarWhereInput[]
    OR?: BookTagScalarWhereInput[]
    NOT?: BookTagScalarWhereInput | BookTagScalarWhereInput[]
    bookId?: IntFilter<"BookTag"> | number
    tagId?: IntFilter<"BookTag"> | number
  }

  export type AnimeTagCreateWithoutAnimeInput = {
    tag: TagCreateNestedOneWithoutAnimesInput
  }

  export type AnimeTagUncheckedCreateWithoutAnimeInput = {
    tagId: number
  }

  export type AnimeTagCreateOrConnectWithoutAnimeInput = {
    where: AnimeTagWhereUniqueInput
    create: XOR<AnimeTagCreateWithoutAnimeInput, AnimeTagUncheckedCreateWithoutAnimeInput>
  }

  export type AnimeTagCreateManyAnimeInputEnvelope = {
    data: AnimeTagCreateManyAnimeInput | AnimeTagCreateManyAnimeInput[]
  }

  export type AnimeTagUpsertWithWhereUniqueWithoutAnimeInput = {
    where: AnimeTagWhereUniqueInput
    update: XOR<AnimeTagUpdateWithoutAnimeInput, AnimeTagUncheckedUpdateWithoutAnimeInput>
    create: XOR<AnimeTagCreateWithoutAnimeInput, AnimeTagUncheckedCreateWithoutAnimeInput>
  }

  export type AnimeTagUpdateWithWhereUniqueWithoutAnimeInput = {
    where: AnimeTagWhereUniqueInput
    data: XOR<AnimeTagUpdateWithoutAnimeInput, AnimeTagUncheckedUpdateWithoutAnimeInput>
  }

  export type AnimeTagUpdateManyWithWhereWithoutAnimeInput = {
    where: AnimeTagScalarWhereInput
    data: XOR<AnimeTagUpdateManyMutationInput, AnimeTagUncheckedUpdateManyWithoutAnimeInput>
  }

  export type AnimeTagScalarWhereInput = {
    AND?: AnimeTagScalarWhereInput | AnimeTagScalarWhereInput[]
    OR?: AnimeTagScalarWhereInput[]
    NOT?: AnimeTagScalarWhereInput | AnimeTagScalarWhereInput[]
    animeId?: IntFilter<"AnimeTag"> | number
    tagId?: IntFilter<"AnimeTag"> | number
  }

  export type MusicTagCreateWithoutMusicInput = {
    tag: TagCreateNestedOneWithoutMusicsInput
  }

  export type MusicTagUncheckedCreateWithoutMusicInput = {
    tagId: number
  }

  export type MusicTagCreateOrConnectWithoutMusicInput = {
    where: MusicTagWhereUniqueInput
    create: XOR<MusicTagCreateWithoutMusicInput, MusicTagUncheckedCreateWithoutMusicInput>
  }

  export type MusicTagCreateManyMusicInputEnvelope = {
    data: MusicTagCreateManyMusicInput | MusicTagCreateManyMusicInput[]
  }

  export type MusicTagUpsertWithWhereUniqueWithoutMusicInput = {
    where: MusicTagWhereUniqueInput
    update: XOR<MusicTagUpdateWithoutMusicInput, MusicTagUncheckedUpdateWithoutMusicInput>
    create: XOR<MusicTagCreateWithoutMusicInput, MusicTagUncheckedCreateWithoutMusicInput>
  }

  export type MusicTagUpdateWithWhereUniqueWithoutMusicInput = {
    where: MusicTagWhereUniqueInput
    data: XOR<MusicTagUpdateWithoutMusicInput, MusicTagUncheckedUpdateWithoutMusicInput>
  }

  export type MusicTagUpdateManyWithWhereWithoutMusicInput = {
    where: MusicTagScalarWhereInput
    data: XOR<MusicTagUpdateManyMutationInput, MusicTagUncheckedUpdateManyWithoutMusicInput>
  }

  export type MusicTagScalarWhereInput = {
    AND?: MusicTagScalarWhereInput | MusicTagScalarWhereInput[]
    OR?: MusicTagScalarWhereInput[]
    NOT?: MusicTagScalarWhereInput | MusicTagScalarWhereInput[]
    musicId?: IntFilter<"MusicTag"> | number
    tagId?: IntFilter<"MusicTag"> | number
  }

  export type BookTagCreateWithoutTagInput = {
    book: BookCreateNestedOneWithoutTagsInput
  }

  export type BookTagUncheckedCreateWithoutTagInput = {
    bookId: number
  }

  export type BookTagCreateOrConnectWithoutTagInput = {
    where: BookTagWhereUniqueInput
    create: XOR<BookTagCreateWithoutTagInput, BookTagUncheckedCreateWithoutTagInput>
  }

  export type BookTagCreateManyTagInputEnvelope = {
    data: BookTagCreateManyTagInput | BookTagCreateManyTagInput[]
  }

  export type AnimeTagCreateWithoutTagInput = {
    anime: AnimeCreateNestedOneWithoutTagsInput
  }

  export type AnimeTagUncheckedCreateWithoutTagInput = {
    animeId: number
  }

  export type AnimeTagCreateOrConnectWithoutTagInput = {
    where: AnimeTagWhereUniqueInput
    create: XOR<AnimeTagCreateWithoutTagInput, AnimeTagUncheckedCreateWithoutTagInput>
  }

  export type AnimeTagCreateManyTagInputEnvelope = {
    data: AnimeTagCreateManyTagInput | AnimeTagCreateManyTagInput[]
  }

  export type MusicTagCreateWithoutTagInput = {
    music: MusicCreateNestedOneWithoutTagsInput
  }

  export type MusicTagUncheckedCreateWithoutTagInput = {
    musicId: number
  }

  export type MusicTagCreateOrConnectWithoutTagInput = {
    where: MusicTagWhereUniqueInput
    create: XOR<MusicTagCreateWithoutTagInput, MusicTagUncheckedCreateWithoutTagInput>
  }

  export type MusicTagCreateManyTagInputEnvelope = {
    data: MusicTagCreateManyTagInput | MusicTagCreateManyTagInput[]
  }

  export type BookTagUpsertWithWhereUniqueWithoutTagInput = {
    where: BookTagWhereUniqueInput
    update: XOR<BookTagUpdateWithoutTagInput, BookTagUncheckedUpdateWithoutTagInput>
    create: XOR<BookTagCreateWithoutTagInput, BookTagUncheckedCreateWithoutTagInput>
  }

  export type BookTagUpdateWithWhereUniqueWithoutTagInput = {
    where: BookTagWhereUniqueInput
    data: XOR<BookTagUpdateWithoutTagInput, BookTagUncheckedUpdateWithoutTagInput>
  }

  export type BookTagUpdateManyWithWhereWithoutTagInput = {
    where: BookTagScalarWhereInput
    data: XOR<BookTagUpdateManyMutationInput, BookTagUncheckedUpdateManyWithoutTagInput>
  }

  export type AnimeTagUpsertWithWhereUniqueWithoutTagInput = {
    where: AnimeTagWhereUniqueInput
    update: XOR<AnimeTagUpdateWithoutTagInput, AnimeTagUncheckedUpdateWithoutTagInput>
    create: XOR<AnimeTagCreateWithoutTagInput, AnimeTagUncheckedCreateWithoutTagInput>
  }

  export type AnimeTagUpdateWithWhereUniqueWithoutTagInput = {
    where: AnimeTagWhereUniqueInput
    data: XOR<AnimeTagUpdateWithoutTagInput, AnimeTagUncheckedUpdateWithoutTagInput>
  }

  export type AnimeTagUpdateManyWithWhereWithoutTagInput = {
    where: AnimeTagScalarWhereInput
    data: XOR<AnimeTagUpdateManyMutationInput, AnimeTagUncheckedUpdateManyWithoutTagInput>
  }

  export type MusicTagUpsertWithWhereUniqueWithoutTagInput = {
    where: MusicTagWhereUniqueInput
    update: XOR<MusicTagUpdateWithoutTagInput, MusicTagUncheckedUpdateWithoutTagInput>
    create: XOR<MusicTagCreateWithoutTagInput, MusicTagUncheckedCreateWithoutTagInput>
  }

  export type MusicTagUpdateWithWhereUniqueWithoutTagInput = {
    where: MusicTagWhereUniqueInput
    data: XOR<MusicTagUpdateWithoutTagInput, MusicTagUncheckedUpdateWithoutTagInput>
  }

  export type MusicTagUpdateManyWithWhereWithoutTagInput = {
    where: MusicTagScalarWhereInput
    data: XOR<MusicTagUpdateManyMutationInput, MusicTagUncheckedUpdateManyWithoutTagInput>
  }

  export type MusicCreateWithoutTagsInput = {
    title: string
    artist: string
    album?: string | null
    coverUrl?: string | null
    qqMusicId?: string | null
    playlistId?: string | null
    duration?: number | null
    status?: string
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MusicUncheckedCreateWithoutTagsInput = {
    id?: number
    title: string
    artist: string
    album?: string | null
    coverUrl?: string | null
    qqMusicId?: string | null
    playlistId?: string | null
    duration?: number | null
    status?: string
    rating?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MusicCreateOrConnectWithoutTagsInput = {
    where: MusicWhereUniqueInput
    create: XOR<MusicCreateWithoutTagsInput, MusicUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutMusicsInput = {
    name: string
    color?: string
    createdAt?: Date | string
    books?: BookTagCreateNestedManyWithoutTagInput
    animes?: AnimeTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutMusicsInput = {
    id?: number
    name: string
    color?: string
    createdAt?: Date | string
    books?: BookTagUncheckedCreateNestedManyWithoutTagInput
    animes?: AnimeTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutMusicsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutMusicsInput, TagUncheckedCreateWithoutMusicsInput>
  }

  export type MusicUpsertWithoutTagsInput = {
    update: XOR<MusicUpdateWithoutTagsInput, MusicUncheckedUpdateWithoutTagsInput>
    create: XOR<MusicCreateWithoutTagsInput, MusicUncheckedCreateWithoutTagsInput>
    where?: MusicWhereInput
  }

  export type MusicUpdateToOneWithWhereWithoutTagsInput = {
    where?: MusicWhereInput
    data: XOR<MusicUpdateWithoutTagsInput, MusicUncheckedUpdateWithoutTagsInput>
  }

  export type MusicUpdateWithoutTagsInput = {
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    album?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qqMusicId?: NullableStringFieldUpdateOperationsInput | string | null
    playlistId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MusicUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    artist?: StringFieldUpdateOperationsInput | string
    album?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    qqMusicId?: NullableStringFieldUpdateOperationsInput | string | null
    playlistId?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpsertWithoutMusicsInput = {
    update: XOR<TagUpdateWithoutMusicsInput, TagUncheckedUpdateWithoutMusicsInput>
    create: XOR<TagCreateWithoutMusicsInput, TagUncheckedCreateWithoutMusicsInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutMusicsInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutMusicsInput, TagUncheckedUpdateWithoutMusicsInput>
  }

  export type TagUpdateWithoutMusicsInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookTagUpdateManyWithoutTagNestedInput
    animes?: AnimeTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutMusicsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookTagUncheckedUpdateManyWithoutTagNestedInput
    animes?: AnimeTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type BookCreateWithoutTagsInput = {
    title: string
    author: string
    publisher?: string | null
    publishYear?: number | null
    isbn?: string | null
    coverUrl?: string | null
    description?: string | null
    status?: string
    rating?: number | null
    notes?: string | null
    startDate?: Date | string | null
    finishDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookUncheckedCreateWithoutTagsInput = {
    id?: number
    title: string
    author: string
    publisher?: string | null
    publishYear?: number | null
    isbn?: string | null
    coverUrl?: string | null
    description?: string | null
    status?: string
    rating?: number | null
    notes?: string | null
    startDate?: Date | string | null
    finishDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BookCreateOrConnectWithoutTagsInput = {
    where: BookWhereUniqueInput
    create: XOR<BookCreateWithoutTagsInput, BookUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutBooksInput = {
    name: string
    color?: string
    createdAt?: Date | string
    animes?: AnimeTagCreateNestedManyWithoutTagInput
    musics?: MusicTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutBooksInput = {
    id?: number
    name: string
    color?: string
    createdAt?: Date | string
    animes?: AnimeTagUncheckedCreateNestedManyWithoutTagInput
    musics?: MusicTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutBooksInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutBooksInput, TagUncheckedCreateWithoutBooksInput>
  }

  export type BookUpsertWithoutTagsInput = {
    update: XOR<BookUpdateWithoutTagsInput, BookUncheckedUpdateWithoutTagsInput>
    create: XOR<BookCreateWithoutTagsInput, BookUncheckedCreateWithoutTagsInput>
    where?: BookWhereInput
  }

  export type BookUpdateToOneWithWhereWithoutTagsInput = {
    where?: BookWhereInput
    data: XOR<BookUpdateWithoutTagsInput, BookUncheckedUpdateWithoutTagsInput>
  }

  export type BookUpdateWithoutTagsInput = {
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    publishYear?: NullableIntFieldUpdateOperationsInput | number | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BookUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    publisher?: NullableStringFieldUpdateOperationsInput | string | null
    publishYear?: NullableIntFieldUpdateOperationsInput | number | null
    isbn?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpsertWithoutBooksInput = {
    update: XOR<TagUpdateWithoutBooksInput, TagUncheckedUpdateWithoutBooksInput>
    create: XOR<TagCreateWithoutBooksInput, TagUncheckedCreateWithoutBooksInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutBooksInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutBooksInput, TagUncheckedUpdateWithoutBooksInput>
  }

  export type TagUpdateWithoutBooksInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animes?: AnimeTagUpdateManyWithoutTagNestedInput
    musics?: MusicTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutBooksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    animes?: AnimeTagUncheckedUpdateManyWithoutTagNestedInput
    musics?: MusicTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type AnimeCreateWithoutTagsInput = {
    titleCn: string
    titleJp?: string | null
    coverUrl?: string | null
    summary?: string | null
    studio?: string | null
    airDate?: Date | string | null
    totalEpisodes?: number | null
    watchedEpisodes?: number
    bangumiId?: number | null
    status?: string
    rating?: number | null
    notes?: string | null
    startDate?: Date | string | null
    finishDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimeUncheckedCreateWithoutTagsInput = {
    id?: number
    titleCn: string
    titleJp?: string | null
    coverUrl?: string | null
    summary?: string | null
    studio?: string | null
    airDate?: Date | string | null
    totalEpisodes?: number | null
    watchedEpisodes?: number
    bangumiId?: number | null
    status?: string
    rating?: number | null
    notes?: string | null
    startDate?: Date | string | null
    finishDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AnimeCreateOrConnectWithoutTagsInput = {
    where: AnimeWhereUniqueInput
    create: XOR<AnimeCreateWithoutTagsInput, AnimeUncheckedCreateWithoutTagsInput>
  }

  export type TagCreateWithoutAnimesInput = {
    name: string
    color?: string
    createdAt?: Date | string
    books?: BookTagCreateNestedManyWithoutTagInput
    musics?: MusicTagCreateNestedManyWithoutTagInput
  }

  export type TagUncheckedCreateWithoutAnimesInput = {
    id?: number
    name: string
    color?: string
    createdAt?: Date | string
    books?: BookTagUncheckedCreateNestedManyWithoutTagInput
    musics?: MusicTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type TagCreateOrConnectWithoutAnimesInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutAnimesInput, TagUncheckedCreateWithoutAnimesInput>
  }

  export type AnimeUpsertWithoutTagsInput = {
    update: XOR<AnimeUpdateWithoutTagsInput, AnimeUncheckedUpdateWithoutTagsInput>
    create: XOR<AnimeCreateWithoutTagsInput, AnimeUncheckedCreateWithoutTagsInput>
    where?: AnimeWhereInput
  }

  export type AnimeUpdateToOneWithWhereWithoutTagsInput = {
    where?: AnimeWhereInput
    data: XOR<AnimeUpdateWithoutTagsInput, AnimeUncheckedUpdateWithoutTagsInput>
  }

  export type AnimeUpdateWithoutTagsInput = {
    titleCn?: StringFieldUpdateOperationsInput | string
    titleJp?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    studio?: NullableStringFieldUpdateOperationsInput | string | null
    airDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    watchedEpisodes?: IntFieldUpdateOperationsInput | number
    bangumiId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnimeUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    titleCn?: StringFieldUpdateOperationsInput | string
    titleJp?: NullableStringFieldUpdateOperationsInput | string | null
    coverUrl?: NullableStringFieldUpdateOperationsInput | string | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    studio?: NullableStringFieldUpdateOperationsInput | string | null
    airDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    totalEpisodes?: NullableIntFieldUpdateOperationsInput | number | null
    watchedEpisodes?: IntFieldUpdateOperationsInput | number
    bangumiId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: StringFieldUpdateOperationsInput | string
    rating?: NullableIntFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    finishDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagUpsertWithoutAnimesInput = {
    update: XOR<TagUpdateWithoutAnimesInput, TagUncheckedUpdateWithoutAnimesInput>
    create: XOR<TagCreateWithoutAnimesInput, TagUncheckedCreateWithoutAnimesInput>
    where?: TagWhereInput
  }

  export type TagUpdateToOneWithWhereWithoutAnimesInput = {
    where?: TagWhereInput
    data: XOR<TagUpdateWithoutAnimesInput, TagUncheckedUpdateWithoutAnimesInput>
  }

  export type TagUpdateWithoutAnimesInput = {
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookTagUpdateManyWithoutTagNestedInput
    musics?: MusicTagUpdateManyWithoutTagNestedInput
  }

  export type TagUncheckedUpdateWithoutAnimesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    books?: BookTagUncheckedUpdateManyWithoutTagNestedInput
    musics?: MusicTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type BookTagCreateManyBookInput = {
    tagId: number
  }

  export type BookTagUpdateWithoutBookInput = {
    tag?: TagUpdateOneRequiredWithoutBooksNestedInput
  }

  export type BookTagUncheckedUpdateWithoutBookInput = {
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type BookTagUncheckedUpdateManyWithoutBookInput = {
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type AnimeTagCreateManyAnimeInput = {
    tagId: number
  }

  export type AnimeTagUpdateWithoutAnimeInput = {
    tag?: TagUpdateOneRequiredWithoutAnimesNestedInput
  }

  export type AnimeTagUncheckedUpdateWithoutAnimeInput = {
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type AnimeTagUncheckedUpdateManyWithoutAnimeInput = {
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicTagCreateManyMusicInput = {
    tagId: number
  }

  export type MusicTagUpdateWithoutMusicInput = {
    tag?: TagUpdateOneRequiredWithoutMusicsNestedInput
  }

  export type MusicTagUncheckedUpdateWithoutMusicInput = {
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicTagUncheckedUpdateManyWithoutMusicInput = {
    tagId?: IntFieldUpdateOperationsInput | number
  }

  export type BookTagCreateManyTagInput = {
    bookId: number
  }

  export type AnimeTagCreateManyTagInput = {
    animeId: number
  }

  export type MusicTagCreateManyTagInput = {
    musicId: number
  }

  export type BookTagUpdateWithoutTagInput = {
    book?: BookUpdateOneRequiredWithoutTagsNestedInput
  }

  export type BookTagUncheckedUpdateWithoutTagInput = {
    bookId?: IntFieldUpdateOperationsInput | number
  }

  export type BookTagUncheckedUpdateManyWithoutTagInput = {
    bookId?: IntFieldUpdateOperationsInput | number
  }

  export type AnimeTagUpdateWithoutTagInput = {
    anime?: AnimeUpdateOneRequiredWithoutTagsNestedInput
  }

  export type AnimeTagUncheckedUpdateWithoutTagInput = {
    animeId?: IntFieldUpdateOperationsInput | number
  }

  export type AnimeTagUncheckedUpdateManyWithoutTagInput = {
    animeId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicTagUpdateWithoutTagInput = {
    music?: MusicUpdateOneRequiredWithoutTagsNestedInput
  }

  export type MusicTagUncheckedUpdateWithoutTagInput = {
    musicId?: IntFieldUpdateOperationsInput | number
  }

  export type MusicTagUncheckedUpdateManyWithoutTagInput = {
    musicId?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use BookCountOutputTypeDefaultArgs instead
     */
    export type BookCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AnimeCountOutputTypeDefaultArgs instead
     */
    export type AnimeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnimeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MusicCountOutputTypeDefaultArgs instead
     */
    export type MusicCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MusicCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TagCountOutputTypeDefaultArgs instead
     */
    export type TagCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TagCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookDefaultArgs instead
     */
    export type BookArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AnimeDefaultArgs instead
     */
    export type AnimeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnimeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MusicDefaultArgs instead
     */
    export type MusicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MusicDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TagDefaultArgs instead
     */
    export type TagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MusicTagDefaultArgs instead
     */
    export type MusicTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MusicTagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BookTagDefaultArgs instead
     */
    export type BookTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BookTagDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AnimeTagDefaultArgs instead
     */
    export type AnimeTagArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnimeTagDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}