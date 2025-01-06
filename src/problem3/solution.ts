import React, { useMemo } from "react";

// Clear definition of blockchain types
type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

interface Props extends BoxProps {
  children: React.ReactNode;
}

const BLOCKCHAINS: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

const WithWalletRow = React.memo((props) => {
  return <WalletRow {...props} />;
});

export const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Memoize sorted balances
  const sortedBalances = useMemo(() => {
    return balances
      .filter(
        (balance: WalletBalance) =>
          BLOCKCHAINS[balance.blockchain] > -99 && balance.amount > 0
      )
      .sort(
        (lhs, rhs) => BLOCKCHAINS[rhs.blockchain] - BLOCKCHAINS[lhs.blockchain]
      );
  }, [balances]);

  // Map over sortedBalances to create WalletRow components
  const rows = useMemo(() => {
    return sortedBalances.map((balance) => {
      const formatted = balance.amount.toFixed(2); // Format to 2 decimal places
      const usdValue = (prices[balance.currency] || 0) * balance.amount;

      return (
        <WithWalletRow
          className={classes.row}
          key={`${balance.currency}-${balance.blockchain}`}
          amount={(balance, amount)}
          usdValue={usdValue}
          formattedAmount={formatted}
        />
      );
    });
  }, [sortedBalances]);

  return (
    <div {...rest}>
      {rows}
      {children}
    </div>
  );
};

/**
 * WHAT HAVE BEEN DONE:
 * Add useMemo to Memoize variable changes base on dependency
 * Remove definition of FormattedWalletBalance and move the formataddress field inside the render WalletRow itselt because it have same dependency is: sortedBalances
 * Add missing definition blockchain in WalletBalance
 * Add BLOCKCHAINS const and remove getPriority so later we can just directly get the priority from BLOCKCHAINS
 * optimize sortedBalances with: remove redundant if clause in both sort and filter, directly pick priority from BLOCKCHAINS
 * Move formattedBalances into rows itself because it have same dependency and small calculation
 * Create a React.memo component to prevent redundant render for WalletRow
 * Add missing children render
 * Update walletrows key to unique
 * Maximum the dependency of each variable should be only 1 and maximum dependency of a component should only be less than 3
 * THERE MIGHT BE OTHER CHANGES THAT I FORGOT TO LIST, IF YOU CONCERN THEN WE CAN ASK IN THE INTERVIEW
 */
