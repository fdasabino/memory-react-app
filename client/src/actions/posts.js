import * as api from "../api/index.js";
import Swal from "sweetalert2";
import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const swalDangerButton = Swal.mixin({
  buttonsStyling: true,
});
const swalSuccessButton = Swal.mixin({
  buttonsStyling: true,
});

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    Toast.fire({
      icon: "success",
      title: "Post created successfully!",
    });

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    Toast.fire({
      icon: "success",
      title: "Post updated successfully!",
    });
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    Toast.fire({
      icon: "success",
      title: "Great! You liked a post!",
    });
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    swalSuccessButton
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: false,
      })
      .then((result) => {
        if (result.isConfirmed) {
          api.deletePost(id);
          swalDangerButton.fire(
            "Deleted!",
            "Oh no!!! Your post has been deleted.",
            "error"
          );
          dispatch({ type: DELETE, payload: id });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalSuccessButton.fire("Cancelled", "Your post is safe", "success");
        }
      });
  } catch (error) {
    console.log(error);
  }
};
