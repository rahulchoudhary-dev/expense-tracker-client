"use client";

import React, { useState } from "react";
import {
  FileText,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Code,
  Heart,
  Download,
  Search,
} from "lucide-react";

interface OpenSourceLicensesProps {
  onBack?: () => void;
}

interface License {
  id: string;
  name: string;
  version?: string;
  author?: string;
  description: string;
  licenseType: string;
  url?: string;
  licenseText: string;
}

const OpenSourceLicenses: React.FC<OpenSourceLicensesProps> = ({ onBack }) => {
  const [expandedLicense, setExpandedLicense] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const licenses: License[] = [
    {
      id: "react",
      name: "React",
      version: "18.2.0",
      author: "Meta Platforms, Inc.",
      description: "A JavaScript library for building user interfaces",
      licenseType: "MIT License",
      url: "https://reactjs.org/",
      licenseText: `MIT License

Copyright (c) Meta Platforms, Inc. and affiliates.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    },
    {
      id: "nextjs",
      name: "Next.js",
      version: "14.0.0",
      author: "Vercel, Inc.",
      description: "The React Framework for Production",
      licenseType: "MIT License",
      url: "https://nextjs.org/",
      licenseText: `MIT License

Copyright (c) 2023 Vercel, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    },
    {
      id: "tailwindcss",
      name: "Tailwind CSS",
      version: "3.3.0",
      author: "Tailwind Labs Inc.",
      description: "A utility-first CSS framework for rapid UI development",
      licenseType: "MIT License",
      url: "https://tailwindcss.com/",
      licenseText: `MIT License

Copyright (c) Tailwind Labs Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    },
    {
      id: "lucide-react",
      name: "Lucide React",
      version: "0.294.0",
      author: "Lucide Contributors",
      description: "Beautiful & consistent icon toolkit made by the community",
      licenseType: "ISC License",
      url: "https://lucide.dev/",
      licenseText: `ISC License

Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2022.

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`,
    },
    {
      id: "typescript",
      name: "TypeScript",
      version: "5.2.0",
      author: "Microsoft Corporation",
      description: "TypeScript is a language for application-scale JavaScript",
      licenseType: "Apache License 2.0",
      url: "https://www.typescriptlang.org/",
      licenseText: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.

"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.

"Licensor" shall mean the copyright owner or entity granting the License.

"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity.

"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.

"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.

"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.

"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work.

"Derivative Works" shall mean any work, whether in Source or Object form, that is based upon (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship.

"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner.

2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to use, reproduce, modify, display, perform, sublicense, and distribute the Work and such Derivative Works in source or object form.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.`,
    },
    {
      id: "eslint",
      name: "ESLint",
      version: "8.52.0",
      author: "JS Foundation and other contributors",
      description:
        "A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code",
      licenseType: "MIT License",
      url: "https://eslint.org/",
      licenseText: `MIT License

Copyright JS Foundation and other contributors, https://js.foundation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
    },
  ];

  const filteredLicenses = licenses.filter(
    (license) =>
      license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.licenseType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const LicenseItem: React.FC<{ license: License }> = ({ license }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={() =>
          setExpandedLicense(expandedLicense === license.id ? null : license.id)
        }
      >
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white mr-3">
              {license.name}
            </h3>
            {license.version && (
              <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                v{license.version}
              </span>
            )}
            {license.url && (
              <a
                href={license.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            {license.description}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span className="mr-4">{license.licenseType}</span>
            {license.author && <span>by {license.author}</span>}
          </div>
        </div>
        {expandedLicense === license.id ? (
          <ChevronUp size={20} className="text-gray-500 ml-4" />
        ) : (
          <ChevronDown size={20} className="text-gray-500 ml-4" />
        )}
      </button>

      {expandedLicense === license.id && (
        <div className="px-6 pb-6">
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900 dark:text-white">
                License Text
              </h4>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(license.licenseText)
                }
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
              >
                <Download size={14} className="mr-1" />
                Copy
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                {license.licenseText}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            {onBack && (
              <button
                onClick={onBack}
                className="mr-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            <div className="flex items-center">
              <FileText
                className="mr-3 text-blue-600 dark:text-blue-400"
                size={32}
              />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Open Source Licenses
              </h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            This application is built with amazing open source libraries. Here
            are their licenses and attributions.
          </p>
        </div>

        {/* Acknowledgment */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Heart className="text-red-500 mr-3" size={24} />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Thank You, Open Source Community!
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            This application wouldn't be possible without the incredible work of
            open source developers around the world. We're grateful for their
            contributions and commitment to making software development
            accessible to everyone.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search libraries, licenses, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {licenses.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Open Source Libraries
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {new Set(licenses.map((l) => l.licenseType)).size}
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              License Types
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              100%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Free & Open Source
            </div>
          </div>
        </div>

        {/* Licenses List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-6">
            <Code className="text-blue-600 dark:text-blue-400 mr-3" size={24} />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Libraries & Dependencies
            </h2>
          </div>

          {filteredLicenses.length > 0 ? (
            <div>
              {filteredLicenses.map((license) => (
                <LicenseItem key={license.id} license={license} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No libraries found matching your search criteria.
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Important Notes
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <li>
              • This list includes the major open source libraries used in this
              application.
            </li>
            <li>
              • Each library may have its own dependencies with their respective
              licenses.
            </li>
            <li>
              • For the most up-to-date license information, please visit the
              official project repositories.
            </li>
            <li>
              • If you believe any license information is incorrect or missing,
              please contact our support team.
            </li>
          </ul>
        </div>

        {/* Export Options */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              const licenseData = licenses.map((l) => ({
                name: l.name,
                version: l.version,
                author: l.author,
                licenseType: l.licenseType,
                url: l.url,
              }));
              const blob = new Blob([JSON.stringify(licenseData, null, 2)], {
                type: "application/json",
              });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "open-source-licenses.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Download size={18} className="mr-2" />
            Export License Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpenSourceLicenses;
