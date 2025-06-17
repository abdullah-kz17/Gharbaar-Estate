import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../../store/thunks/blogThunks";
import BlogForm from "../../../components/blogs/BlogForm";

const CreateBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (formData, resetForm) => {
        dispatch(createBlog(formData))
            .unwrap()
            .then(() => {
                toast.success("Blog created successfully!");
                resetForm(); 
                navigate("/blogs"); 
            })
            .catch((err) => {
                toast.error(`Error: ${err}`);
            });
    };

    return <BlogForm onSubmit={handleSubmit} />;
};

export default CreateBlog;
