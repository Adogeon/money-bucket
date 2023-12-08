import User from "./user";
import type { iUser } from "./user";
import type { iBucket } from "./bucket";
import Bucket from "./bucket";
import type { iTransaction } from "./transaction";
import Transaction from "./transaction";

export type iDocument = iBucket | iUser | iTransaction;
export default { User, Bucket, Transaction };
