/**
 * NB: For the use case of this interview only.
 * In production it is best practice to place
 * "TransactionStatus" in a callup table.
 */

enum TransactionStatus {
    INITIATED = 0,
    PENDING,
    FULFILED
};

export default TransactionStatus;