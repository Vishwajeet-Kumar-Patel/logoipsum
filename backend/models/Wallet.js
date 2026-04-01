const mongoose = require('mongoose');

const walletTransactionSchema = mongoose.Schema(
  {
    amount: { type: Number, required: true },
    type: { type: String, enum: ['credit', 'debit'], required: true },
    referenceId: { type: String, default: null },
    status: {
      type: String,
      enum: ['success', 'failed', 'pending'],
      default: 'success'
    },
    createdAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const walletSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true
    },
    balance: { type: Number, default: 0, min: 0 },
    transactions: { type: [walletTransactionSchema], default: [] }
  },
  { timestamps: { createdAt: false, updatedAt: true } }
);

module.exports = mongoose.models.Wallet || mongoose.model('Wallet', walletSchema);
