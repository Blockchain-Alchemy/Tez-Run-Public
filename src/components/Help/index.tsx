import { useState } from "react";
import { Tooltip } from "@mui/material";
import { InformationCircleOutlined } from "icons/information-circle-outlined";
import { HelpDialog } from "./Dialog";

type Props = {
  title: string;
  content: string;
};

export const Help = (props: Props) => {
  const { title, content } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Tooltip title={title} onClick={() => setShowModal(true)}>
        <InformationCircleOutlined
          sx={{ color: "action.active", cursor: "pointer" }}
        />
      </Tooltip>
      <HelpDialog
        open={showModal}
        onClose={() => setShowModal(false)}
        title={title}
        content={content}
      />
    </>
  );
};
