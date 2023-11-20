import { useEffect } from "react";
import { addTransaction } from "../../API/transaction.api";
import { useApi } from "../../hooks/useAPI";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../../components/Form/TransactionFormContainer";

const AddPage = () => {
  const navigate = useNavigate();
  const [addNewResponse, addNewTransaction] = useApi(addTransaction);

  useEffect(() => {
    if (addNewResponse.isSuccess) {
      navigate("/");
    }
  }, [addNewResponse]);

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-sm p-8 m-4 md:max-w-sm md:mx-auto">
        <h1 className="block w-full tex-center text-2xl font-bold text-grey-darkest mb-6">
          Add a Transaction
        </h1>
        <TransactionForm
          apiCallBack={(transaction) => {
            addNewTransaction(transaction);
          }}
          navigateBack={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default AddPage;
