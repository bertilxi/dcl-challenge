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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal size="tiny" open={true}>
      <ModalNavigation
        title="Transfer"
        subtitle="Send tokens to an account"
        onBack={handleBack}
        onClose={handleBack}
      />
      <Form onSubmit={handleSubmit(walletStore.transfer)}>
        <Modal.Content>
          <Controller
            name="amount"
            control={control}
            rules={{ required: "The amount is required", min: 0 }}
            render={({ field }) => (
              <Field
                {...field}
                label="Amount"
                placeholder="0"
                type="number"
                error={!!errors.amount}
                message={errors.amount?.message}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            rules={{ required: "The address is required" }}
            render={({ field }) => (
              <Field
                {...field}
                label="Address"
                placeholder="0x..."
                type="address"
                error={!!errors.address}
                message={errors.address?.message}
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
