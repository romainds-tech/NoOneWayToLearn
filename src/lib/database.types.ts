import type {MergeDeep} from 'type-fest'
import type {Database as DatabaseGenerated} from './database-generated.types'
export type { Json } from './database-generated.types'

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

export type Database = MergeDeep<
    DatabaseGenerated,
    {
        public: {
            Views: {
            }
        }
    }
>