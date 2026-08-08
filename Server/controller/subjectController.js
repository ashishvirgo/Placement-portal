import Subject from "../model/Subject.js";

// ================= ADD SUBJECT =================
export const addSubject = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Subject name required" });
    }

    // Check duplicate
    const exists = await Subject.findOne({ name });
    if (exists) {
      return res.status(400).json({ message: "Subject already exists" });
    }

    // Generate subjectId (DSA001 style)
    const prefix = name.substring(0, 3).toUpperCase();
    const count = await Subject.countDocuments();
    const subjectId = `${prefix}${String(count + 1).padStart(3, "0")}`;

    const subject = new Subject({
      subjectId,
      name
    });

    await subject.save();

    res.status(201).json({
      message: "Subject added successfully",
      subject
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= GET ALL SUBJECTS =================
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= DELETE SUBJECT =================
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.json({ message: "Subject deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

