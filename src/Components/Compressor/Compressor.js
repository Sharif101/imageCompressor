import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Col, Container, Row } from "react-bootstrap";
import imageCompression from "browser-image-compression";
import "./Compressor.css";

const Compressor = () => {
  let [orgimage, setOrgimage] = useState("");
  let [orgimagefile, setOrgimagefile] = useState("");
  let [compressimage, setCompressimage] = useState("");
  let [filename, setFilename] = useState("");

  let handleimage = (event) => {
    let imagefile = event.target.files[0];
    setOrgimage(imagefile);
    setOrgimagefile(URL.createObjectURL(imagefile));
    setFilename(imagefile.name);
  };

  let handleCompress = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= orgimage / 1024) {
      alert("image is too short cant be compressed");
      return 0;
    }

    let output;
    imageCompression(orgimage, options).then((x) => {
      output = x;
      let downloadlink = URL.createObjectURL(output);
      setCompressimage(downloadlink);
    });
  };

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col lg="5" className="img">
            {orgimagefile ? (
              <img src={orgimagefile} alt="" />
            ) : (
              <img
                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
                alt=""
              />
            )}
          </Col>
          <Col lg="2">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleimage(event)}
              className="mb-4"
            />
            {orgimagefile && (
              <Button
                className="mb-4"
                variant="info"
                onClick={(e) => handleCompress(e)}
              >
                Compress Imgae
              </Button>
            )}
            {compressimage && (
              <Button className="mt-3" variant="info">
                <a href={compressimage} download={filename}>
                  Download
                </a>
              </Button>
            )}
          </Col>
          <Col lg="5" className="img">
            {compressimage ? (
              <img src={compressimage} alt="" />
            ) : (
              <img
                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
                alt=""
              />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Compressor;
