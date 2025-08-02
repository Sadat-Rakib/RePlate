import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, X, Image, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
  onAnalyze?: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  isAnalyzing?: boolean;
  analysisProgress?: number;
  className?: string;
}

export const ImageUploader = ({
  onImagesSelected,
  onAnalyze,
  maxFiles = 10,
  maxFileSize = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  isAnalyzing = false,
  analysisProgress = 0,
  className,
}: ImageUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [previews, setPreviews] = useState<Map<string, string>>(new Map());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    if (!acceptedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: `${file.name} is not a supported image format.`,
        variant: "destructive",
      });
      return false;
    }

    if (file.size > maxFileSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `${file.name} exceeds the ${maxFileSize}MB limit.`,
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const createPreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }, []);

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(validateFile);
    
    if (selectedFiles.length + validFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `Maximum ${maxFiles} files allowed.`,
        variant: "destructive",
      });
      return;
    }

    const newFiles = [...selectedFiles, ...validFiles];
    setSelectedFiles(newFiles);
    
    // Create previews for new files
    const newPreviews = new Map(previews);
    await Promise.all(
      validFiles.map(async (file) => {
        const preview = await createPreview(file);
        newPreviews.set(file.name, preview);
      })
    );
    setPreviews(newPreviews);

    onImagesSelected(newFiles);

    toast({
      title: "Images uploaded",
      description: `${validFiles.length} image(s) ready for analysis.`,
    });
  }, [selectedFiles, previews, maxFiles, onImagesSelected, createPreview, toast, validateFile]);

  const removeFile = (fileName: string) => {
    const newFiles = selectedFiles.filter(file => file.name !== fileName);
    setSelectedFiles(newFiles);
    
    const newPreviews = new Map(previews);
    newPreviews.delete(fileName);
    setPreviews(newPreviews);
    
    onImagesSelected(newFiles);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleAnalyze = () => {
    if (onAnalyze && selectedFiles.length > 0) {
      onAnalyze(selectedFiles);
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Drop Zone */}
      <Card className={`border-2 border-dashed transition-colors ${
        dragActive 
          ? 'border-primary bg-primary/5' 
          : 'border-muted-foreground/25 hover:border-primary/50'
      }`}>
        <CardContent 
          className="p-8 sm:p-12"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <motion.div
              className={`mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 ${
                dragActive ? 'bg-primary/20' : 'bg-muted/50'
              }`}
              animate={{
                scale: dragActive ? 1.1 : 1,
                backgroundColor: dragActive ? 'hsl(var(--primary) / 0.2)' : 'hsl(var(--muted) / 0.5)'
              }}
              transition={{ duration: 0.2 }}
            >
              <Upload className={`w-8 h-8 sm:w-10 sm:h-10 ${
                dragActive ? 'text-primary' : 'text-muted-foreground'
              }`} />
            </motion.div>
            
            <h3 className="text-lg sm:text-xl font-semibold mb-2">
              {dragActive ? 'Drop your images here' : 'Upload food images'}
            </h3>
            
            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
              Drag and drop up to {maxFiles} images, or click to select
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={openFileDialog} variant="default">
                <Image className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
              
              <Button variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              Supports JPEG, PNG, WebP up to {maxFileSize}MB each
            </p>
          </div>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Selected Images Grid */}
      <AnimatePresence>
        {selectedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">
                    Selected Images ({selectedFiles.length})
                  </h3>
                  
                  {onAnalyze && (
                    <Button 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || selectedFiles.length === 0}
                      className="min-w-[120px]"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        'Analyze Images'
                      )}
                    </Button>
                  )}
                </div>

                {isAnalyzing && analysisProgress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Analysis Progress</span>
                      <span>{Math.round(analysisProgress)}%</span>
                    </div>
                    <Progress value={analysisProgress} />
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <AnimatePresence>
                    {selectedFiles.map((file, index) => (
                      <motion.div
                        key={file.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="relative group"
                      >
                        <div className="aspect-square relative overflow-hidden rounded-lg border bg-muted">
                          {previews.get(file.name) && (
                            <img
                              src={previews.get(file.name)}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                          
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeFile(file.name)}
                              className="w-8 h-8 p-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-xs mt-1 truncate text-center text-muted-foreground">
                          {file.name}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};