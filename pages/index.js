import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
// ANTd
import React, { Suspense, useEffect } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

// Page JSON
import JsonBlob, { Generate } from '../lib/home'
import { Build } from '../lib/builder'


// Entire page
export default function Home() {
  console.log(Generate())
  return Build(JsonBlob)
}
