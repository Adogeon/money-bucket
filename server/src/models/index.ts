import User from "./user";
import Bucket from "./bucket";
import Transaction from "./transaction";

export type iDocument = iBucket | iUser | iTransaction;
export default { User, Bucket, Transaction };
