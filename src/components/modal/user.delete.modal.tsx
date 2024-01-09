import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteAUser, resetDelete } from "../../redux/user/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface IProps {
  isOpenDeleteModal: boolean;
  setIsOpenDeleteModal: (v: boolean) => void;
  dataUser: {
    id: number;
    email: string;
    name: string;
  };
}

const UserDeleteModal = (props: IProps) => {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;

  const dispatch = useAppDispatch();
  const isDeleteSuccess = useAppSelector((state) => state.user.isDeleteSuccess);

  useEffect(() => {
    if (isDeleteSuccess === true) {
      setIsOpenDeleteModal(false);
      toast("🦄 Wow so easy! Delete success");
      dispatch(resetDelete());
    }
  }, [isDeleteSuccess]);

  const handleSubmit = () => {
    dispatch(deleteAUser({ id: dataUser?.id }));
  };

  return (
    <Modal
      show={isOpenDeleteModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={false}
      onHide={() => setIsOpenDeleteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the user: {dataUser?.email ?? ""}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => setIsOpenDeleteModal(false)}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;
