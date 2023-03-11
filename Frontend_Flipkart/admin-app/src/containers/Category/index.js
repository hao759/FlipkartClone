import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../actions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Input from "../../components/UI/Input";
import "./style.css";
import { addCategory } from "../../actions/category.action";

const Category = (props) => {
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const dispatch = useDispatch();
  useEffect((props) => {
    dispatch(getAllCategory());
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => {
    const form = new FormData();

    const cat = {
      categoryName,
      parentCategoryId,
      categoryImage,
    };
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    // if (categoryName === "") {
    //   alert("Category name is required");
    //   setShow(false);
    //   return;
  };

  // setCategoryName("");
  // setParentCategoryId("");
  // setShow(false);

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        // {label: category.name,
        // value: category._id,
        // children:
        //   category.children.length > 0 && renderCategories(category.children), }
        <li>{category.name}</li>
      );
    }
    return myCategories;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
            <button onClick={handleShow}>Add </button>
            {/* ========== */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you're reading this text in a modal!
              </Modal.Body>
              <Input
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder={"Name"}
              />
              <select
                className="form-controll"
                value={parentCategoryId}
                onChange={(e) => setParentCategoryId(e.target.value)}
              >
                {createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
              <input
                type="file"
                name="categoryImage"
                onChange={handleCategoryImage}
              />

              {/* ======================= */}
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
export default Category;
