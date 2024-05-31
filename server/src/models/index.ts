import User from "./user";
import Bucket from "./bucket";
import Transaction from "./transaction";
import Budget from "./budget";

export type iDocument = iBucket | iUser | iTransaction | iBudget;
export default { User, Bucket, Transaction, Budget };
