import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNewUser, resetCreate } from "../../redux/user/userSlice";
import { toast } from "react-toastify";

interface IProps {
  isOpenCreateModal: boolean;
  setIsOpenCreateModal: (v: boolean) => void;
}

const UserCreateModal = (props: IProps) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;

  const dispatch = useAppDispatch();
  const isCreateSuccess = useAppSelector((state) => state.user.isCreateSuccess);

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (isCreateSuccess === true) {
      setIsOpenCreateModal(false);
      setEmail("");
      setName("");
      toast("🦄 Wow so easy! Create success");
      dispatch(resetCreate());
    }
  }, [isCreateSuccess]);

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }
    dispatch(createNewUser({ email, name }));
  };

  return (
    <Modal
      show={isOpenCreateModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={false}
      onHide={() => setIsOpenCreateModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add A New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel label="Email" className="mb-3">
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
        </FloatingLabel>
        <FloatingLabel label="Name">
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => setIsOpenCreateModal(false)}
          className="mr-2"
        >
          Cancel
        </Button>
        <Button onClick={() => handleSubmit()}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserCreateModal;
