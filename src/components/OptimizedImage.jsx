import { useState } from 'react';

/**
 * OptimizedImage component với WebP support và proper sizing
 * @param {string} src - Đường dẫn ảnh gốc
 * @param {string} webpSrc - Đường dẫn ảnh WebP (optional)
 * @param {string} alt - Alt text cho accessibility
 * @param {number} width - Chiều rộng ảnh
 * @param {number} height - Chiều cao ảnh
 * @param {string} className - CSS classes
 * @param {string} loading - lazy hoặc eager (default: lazy)
 */
export default function OptimizedImage({
  src,
  webpSrc,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  objectFit = 'contain',
  ...props
}) {
  const [error, setError] = useState(false);
  
  // Nếu không có webpSrc, tự động tạo từ src (giả sử có file .webp tương ứng)
  const finalWebpSrc = webpSrc || (src ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp') : null);
  const hasWebP = finalWebpSrc && finalWebpSrc !== src;

  // Tính toán aspect ratio để tránh layout shift và distortion
  const aspectRatioStyle = width && height 
    ? { aspectRatio: `${width} / ${height}`, objectFit } 
    : { objectFit };

  return (
    <picture className={className} style={{ display: 'inline-block' }}>
      {hasWebP && (
        <source srcSet={finalWebpSrc} type="image/webp" />
      )}
      <img
        src={src}
        alt={alt || ''}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={className}
        style={aspectRatioStyle}
        onError={() => setError(true)}
        {...props}
      />
    </picture>
  );
}

