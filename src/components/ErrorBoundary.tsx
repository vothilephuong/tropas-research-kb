import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Đã xảy ra lỗi
          </h2>
          <p className="text-gray-500 mb-4 max-w-md">
            Một thành phần của ứng dụng gặp lỗi. Thử tải lại trang.
          </p>
          <pre className="text-xs text-red-600 bg-red-50 p-4 rounded-lg max-w-lg overflow-auto mb-4">
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tải lại trang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
