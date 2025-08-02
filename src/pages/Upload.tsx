import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Upload as UploadIcon,
  Camera,
  Image,
  Scan,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    toast({
      title: "Images uploaded successfully",
      description: `${newFiles.length} image(s) ready for AI analysis`,
    });
  };

  const simulateAIAnalysis = async () => {
    setAnalyzing(true);

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockResults = uploadedFiles.map((file, index) => ({
      filename: file.name,
      ingredients: [
        "Fresh tomatoes",
        "Bell peppers",
        "Onions",
        "Garlic cloves",
        "Fresh herbs",
      ][index % 5],
      freshness: Math.floor(Math.random() * 30) + 70, // 70-99%
      expiryDays: Math.floor(Math.random() * 7) + 1,
      suggestions: [
        "Store in refrigerator",
        "Use within 3-5 days",
        "Great for stir-fry or salads",
        "Can be frozen for longer storage",
      ],
    }));

    setResults(mockResults);
    setAnalyzing(false);

    toast({
      title: "AI Analysis Complete",
      description: "Your ingredients have been analyzed and categorized",
    });
  };

  const getFreshnessColor = (freshness: number) => {
    if (freshness >= 85) return "text-green-600";
    if (freshness >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getFreshnessIcon = (freshness: number) => {
    if (freshness >= 85)
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (freshness >= 70)
      return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/lovable-uploads/837f3dfb-5fb0-4ac1-b704-220c20ba2bf7.png"
            alt="Family sharing meal"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-dm-serif text-5xl md:text-7xl text-primary-foreground mb-6">
              AI Food
              <span className="bg-gradient-to-r from-rusted-saffron to-lichen-green bg-clip-text text-transparent">
                {" "}
                Recognition
              </span>
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Upload photos of your ingredients and get instant AI-powered
              identification, freshness analysis, and smart recipe suggestions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-dm-serif text-4xl text-foreground mb-6">
              Upload Your Ingredients
            </h2>
            <p className="text-xl text-muted-foreground">
              Drag and drop images or click to select from your device
            </p>
          </motion.div>

          {/* Upload Zone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors">
              <div
                className="p-12 text-center cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.dataTransfer.files);
                }}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="mb-6">
                  <div className="bg-primary/10 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                    <UploadIcon className="w-12 h-12 text-primary" />
                  </div>
                  <h3 className="font-dm-serif text-2xl text-foreground mb-2">
                    Drop your food photos here
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Supports JPG, PNG, and WebP formats up to 10MB each
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="btn-hero">
                    <Image className="w-5 h-5 mr-2" />
                    Choose Files
                  </Button>
                  <Button variant="outline">
                    <Camera className="w-5 h-5 mr-2" />
                    Use Camera
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </div>
            </Card>
          </motion.div>

          {/* Sample Image Preview */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-dm-serif text-2xl text-foreground mb-6">
              Try with sample images
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                <img
                  src="/lovable-uploads/eb3b2717-bc63-49e1-bfc1-58c36f71045e.png"
                  alt="Fresh ingredient spread"
                  className="rounded-xl w-full h-48 object-cover shadow-lg"
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="btn-hero">
                    <Scan className="w-5 h-5 mr-2" />
                    Analyze This Image
                  </Button>
                </div>
              </div>

              <div className="relative group cursor-pointer hover:scale-105 transition-transform duration-300">
                <img
                  src="/lovable-uploads/837f3dfb-5fb0-4ac1-b704-220c20ba2bf7.png"
                  alt="Prepared meal"
                  className="rounded-xl w-full h-48 object-cover shadow-lg"
                />
                <div className="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="btn-hero">
                    <Scan className="w-5 h-5 mr-2" />
                    Analyze This Image
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-dm-serif text-2xl text-foreground">
                    Uploaded Images ({uploadedFiles.length})
                  </h3>
                  <Button
                    onClick={simulateAIAnalysis}
                    disabled={analyzing}
                    className="btn-hero"
                  >
                    {analyzing ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Scan className="w-5 h-5 mr-2" />
                        Start AI Analysis
                      </>
                    )}
                  </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Analysis Results */}
          {results.length > 0 && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-6">
                <h3 className="font-dm-serif text-2xl text-foreground mb-6">
                  AI Analysis Results
                </h3>

                <div className="space-y-6">
                  {results.map((result, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-primary/30 pl-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-foreground text-lg">
                          {result.ingredients}
                        </h4>
                        <div className="flex items-center space-x-2">
                          {getFreshnessIcon(result.freshness)}
                          <span
                            className={`font-medium ${getFreshnessColor(
                              result.freshness
                            )}`}
                          >
                            {result.freshness}% Fresh
                          </span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-muted-foreground mb-2">
                            <strong>Best use within:</strong>{" "}
                            {result.expiryDays} days
                          </p>
                          <p className="text-muted-foreground">
                            <strong>Filename:</strong> {result.filename}
                          </p>
                        </div>

                        <div>
                          <p className="text-muted-foreground mb-2">
                            <strong>Storage suggestions:</strong>
                          </p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {result.suggestions.map(
                              (suggestion: string, suggestionIndex: number) => (
                                <li
                                  key={suggestionIndex}
                                  className="flex items-start"
                                >
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                                  {suggestion}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button className="btn-nature mr-4">
                    Get Recipe Suggestions
                  </Button>
                  <Button variant="outline">Save to Inventory</Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Upload;
