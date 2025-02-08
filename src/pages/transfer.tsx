import { Button, Field, Form, Modal, ModalNavigation } from "decentraland-ui";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useWalletStore } from "../store/wallet";

type Inputs = {
  amount: number;
  address: string;
};

export function Transfer() {
  const navigate = useNavigate();
  const walletStore = useWalletStore();
  const form = useForm<Inputs>();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleTransfer = useCallback(
    async (data: Inputs) => {
      await walletStore.transfer(data);
      navigate(-1);
    },
    [navigate, walletStore],
  );

  return (
    <Modal size="tiny" open={true}>
      <ModalNavigation
        title="Transfer"
        subtitle="Send tokens to an account"
        onBack={handleBack}
        onClose={handleBack}
      />
      <Form onSubmit={form.handleSubmit(handleTransfer)}>
        <Modal.Content>
          <Controller
            name="amount"
            control={form.control}
            rules={{ required: "The amount is required", min: 0 }}
            render={({ field }) => (
              <div>
                <Field
                  {...field}
                  label="Amount"
                  placeholder="0"
                  type="number"
                  error={!!form.formState.errors.amount}
                  message={form.formState.errors.amount?.message}
                  action="Max"
                  onAction={() =>
                    form.setValue(
                      "amount",
                      Number(walletStore.balance.toString()),
                    )
                  }
                />
              </div>
            )}
          />
          <Controller
            name="address"
            control={form.control}
            rules={{ required: "The address is required" }}
            render={({ field }) => (
              <Field
                {...field}
                label="Address"
                placeholder="0x..."
                type="address"
                error={!!form.formState.errors.address}
                message={form.formState.errors.address?.message}
              />
            )}
          />

          {walletStore.error ? (
            <p className="error">{walletStore.error}</p>
          ) : null}
        </Modal.Content>
        <Modal.Actions>
          <Button primary loading={walletStore.isSending}>
            Send
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  );
}
