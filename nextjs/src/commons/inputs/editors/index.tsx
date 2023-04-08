import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Box, Stack } from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";

export const EditorInput = () => {
  const [convertedText, setConvertedText] = useState("Some default content");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", { align: [] }],
      [{ direction: "rtl" }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "direction",
    "list",
    "bullet",
    "indent",
    "color",
    "background",
    "font",
    "link",
    "image",
  ];

  if (localStorage.getItem("user") !== "vhson2006@gmail.com") return <></>;

  return (
    <Box my={15}>
      <Stack>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={convertedText}
          onChange={setConvertedText}
          style={{ height: 200 }}
        />
      </Stack>
      <div className="ql-editor">{parse(convertedText)}</div>
      {convertedText}
    </Box>
  );
};

export default EditorInput;
