import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import api from "../../api/axios";

const AddEditRecord = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      status: "ACTIVE",
      access: "FULL_ACCESS",
      userId: ""
    });

  useEffect(() => {

    if (!id) return;

    const fetchRecord = async () => {

      try {

        const response =
          await api.get(
            `/records/${id}`
          );

        const record =
          response.data;

        setFormData({
          title:
            record.title || "",

          status:
            record.status ||
            "ACTIVE",

          access:
            record.access ||
            "FULL_ACCESS",

          userId:
            record.userId || ""
        });

      } catch (error) {

        console.log(error);

      }

    };

    fetchRecord();

  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      if (id) {

        await api.patch(
          `/records/${id}`,
          formData
        );

        alert(
          "Record Updated Successfully"
        );

      } else {

        await api.post(
          "/records",
          formData
        );

        alert(
          "Record Created Successfully"
        );

      }

      navigate("/records");

    } catch (error: any) {

      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8">

        <h1 className="text-3xl font-bold mb-6">

          {id
            ? "Edit Record"
            : "Add New Record"}

        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
            required
          />

          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >

            <option value="ACTIVE">
              Active
            </option>

            <option value="PENDING">
              Pending
            </option>

            <option value="CLOSED">
              Closed
            </option>

          </select>

          <select
            name="access"
            value={formData.access}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >

            <option value="FULL_ACCESS">
              Full Access
            </option>

            <option value="LIMITED_ACCESS">
              Limited Access
            </option>

            <option value="READ_ONLY">
              Read Only
            </option>

          </select>

          <button
            type="submit"
            disabled={loading}
            className="col-span-full bg-[#6C4CF1] hover:bg-[#5a3ee0] text-white py-3 rounded-lg"
          >

            {loading
              ? id
                ? "Updating..."
                : "Saving..."
              : id
              ? "Update Record"
              : "Save Record"}

          </button>

        </form>

      </div>

    </div>

  );

};

export default AddEditRecord;